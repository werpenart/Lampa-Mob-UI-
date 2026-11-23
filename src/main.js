/*!
 * Lampa Mob UI — мобильный интерфейс для Lampa по макетам из Figma (файл «lampac»).
 * https://github.com/werpenart/Lampa-Mob-UI-
 */
(function () {
    'use strict';

    if (window.mobui_plugin_loaded) return;
    window.mobui_plugin_loaded = true;

    var VERSION = '0.1.3';
    var ICONS = /*@ICONS@*/{};
    var CSS = /*@CSS@*/'';

    /* ------------------------------------------------------------------ */
    /* Утилиты                                                             */
    /* ------------------------------------------------------------------ */

    var I18N = {
        ru: { movie: 'Фильм', series: 'Сериал', watch: 'Смотреть', more: 'Ещё', edit_menu: 'Редактировать меню', reset: 'Сбросить', done: 'Готово', notifications: 'Уведомления', search_placeholder: 'Фильмы, сериалы, люди', profile: 'Профиль', profile_name: 'Имя в меню', profile_name_descr: 'Отображается в шапке бокового меню' },
        uk: { movie: 'Фільм', series: 'Серіал', watch: 'Дивитися', more: 'Ще', edit_menu: 'Редагувати меню', reset: 'Скинути', done: 'Готово', notifications: 'Сповіщення', search_placeholder: 'Фільми, серіали, люди', profile: 'Профіль', profile_name: "Ім'я в меню", profile_name_descr: 'Відображається у шапці бічного меню' },
        en: { movie: 'Movie', series: 'Series', watch: 'Watch', more: 'More', edit_menu: 'Edit Menu', reset: 'Reset', done: 'Done', notifications: 'Notifications', search_placeholder: 'Movies, series, people', profile: 'Profile', profile_name: 'Menu name', profile_name_descr: 'Shown at the top of the side menu' }
    };

    function lang() {
        var l = Lampa.Storage.get('language', 'ru');
        return I18N[l] ? l : (l === 'be' ? 'ru' : 'en');
    }

    function t(key) {
        return I18N[lang()][key] || I18N.en[key] || key;
    }

    function icon(name) {
        return ICONS[name] || '';
    }

    function esc(str) {
        return String(str == null ? '' : str).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }

    function translateObj(str) {
        if (str && typeof str === 'object') {
            var code = Lampa.Storage.get('language', 'ru');
            if (str[code]) return str[code];
            if (str.ru) return str.ru;
            for (var k in str) return str[k];
        }
        return str || '';
    }

    function tmdbImg(path, size) {
        if (!path) return '';
        if (/^https?:/.test(path)) return path;
        try {
            return Lampa.Api.sources.tmdb.img(path, size || 'w500');
        } catch (e) {
            return Lampa.TMDB.image('t/p/' + (size || 'w500') + path);
        }
    }

    function isSeries(card) {
        return !!(card && (card.original_name || card.first_air_date || card.number_of_seasons || card.media_type === 'tv'));
    }

    function isPerson(card) {
        return !!(card && (card.profile_path !== undefined || card.known_for_department) && !card.poster_path);
    }

    function cardYear(card) {
        var d = card.release_date || card.first_air_date || card.release_year || '';
        return (d + '').slice(0, 4);
    }

    function cardGenre(card) {
        try {
            if (card.genres && card.genres.length) return card.genres[0].name || '';
            if (card.genre_ids && card.genre_ids.length) {
                var names = Lampa.Api.sources.tmdb.getGenresNameFromIds(isSeries(card) ? 'tv' : 'movie', card.genre_ids);
                return names[0] || '';
            }
        } catch (e) { }
        return '';
    }

    function cardVote(card) {
        var v = parseFloat(card.vote_average || 0);
        return v > 0 ? (v >= 10 ? '10' : v.toFixed(1)) : '';
    }

    function cardQuality(card) {
        var q = card.release_quality || card.quality || '';
        return typeof q === 'string' ? q : '';
    }

    function badge(text, cls) {
        return '<div class="mobui-badge' + (cls ? ' ' + cls : '') + '">' + esc(text) + '</div>';
    }

    function rating(vote, big) {
        if (!vote) return '';
        return '<div class="mobui-rating' + (big ? ' mobui-rating--big' : '') + '">' + icon(big ? 'star-16' : 'star-12') + '<span>' + esc(vote) + '</span></div>';
    }

    function metaLine(parts) {
        parts = parts.filter(Boolean);
        return parts.map(function (p) { return '<span>' + esc(p) + '</span>'; }).join('<i class="mobui-sep"></i>');
    }

    function openCard(card) {
        Lampa.Activity.push({
            url: '',
            component: 'full',
            id: card.id,
            method: isSeries(card) ? 'tv' : 'movie',
            card: card,
            source: card.source || Lampa.Storage.field('source')
        });
    }

    // «Смотреть»: сразу онлайн-просмотр Lampac (как кнопка «Онлайн» на странице фильма),
    // если онлайн-плагина нет — открываем страницу фильма
    function watchOnline(card) {
        var hasOnline = false;
        try { hasOnline = !!Lampa.Component.get('lampac'); } catch (e) { }

        if (!hasOnline) return openCard(card);

        var movie = $.extend({}, card);
        if (!movie.title) movie.title = movie.name || movie.original_name || '';
        if (!movie.original_title) movie.original_title = movie.original_name || movie.title;

        var id = Lampa.Utils.hash(isSeries(movie) ? (movie.original_name || movie.original_title) : movie.original_title);
        var all = Lampa.Storage.get('clarification_search', '{}') || {};

        Lampa.Activity.push({
            url: '',
            title: Lampa.Lang.translate('title_online'),
            component: 'lampac',
            search: all[id] ? all[id] : movie.title,
            search_one: movie.title,
            search_two: movie.original_title,
            movie: movie,
            page: 1,
            clarification: all[id] ? true : false
        });
    }

    function onTap(el, fn) {
        $(el).on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            fn.call(this, e);
        });
    }

    /* ------------------------------------------------------------------ */
    /* Фон                                                                 */
    /* ------------------------------------------------------------------ */

    var Bg = {
        el: null,
        src: '',
        init: function () {
            this.el = $('<div class="mobui-bg"><div class="mobui-bg__img"></div><div class="mobui-bg__overlay"></div></div>');
            $('body').prepend(this.el);
        },
        set: function (src) {
            if (!src || src === this.src) return;
            this.src = src;
            var img = new Image();
            var self = this;
            img.onload = function () {
                if (self.src === src) self.el.find('.mobui-bg__img').css('background-image', 'url("' + src + '")').addClass('ready');
            };
            img.src = src;
        }
    };

    /* ------------------------------------------------------------------ */
    /* Шапка                                                               */
    /* ------------------------------------------------------------------ */

    var Header = {
        el: null,
        init: function () {
            var self = this;

            this.el = $(
                '<div class="mobui-head">' +
                    '<div class="mobui-head__leading">' +
                        '<div class="mobui-head__menu">' + icon('menu') + '</div>' +
                        '<div class="mobui-head__title"></div>' +
                    '</div>' +
                    '<div class="mobui-head__actions">' +
                        '<div class="mobui-head__bell">' + icon('bell-dot') + '</div>' +
                        '<div class="mobui-avatar mobui-head__avatar"></div>' +
                    '</div>' +
                '</div>'
            );

            $('.head').append(this.el);

            onTap(this.el.find('.mobui-head__menu'), function () { Drawer.open(); });
            onTap(this.el.find('.mobui-head__bell'), function () { Notify.open(); });
            onTap(this.el.find('.mobui-head__avatar'), function () { Lampa.Controller.toggle('settings'); });

            var title = $('.head .head__title');
            var sync = function () { self.setTitle(title.text()); };

            if (title.length && window.MutationObserver) {
                new MutationObserver(sync).observe(title[0], { childList: true, characterData: true, subtree: true });
            }

            sync();
            this.updateProfile();
            this.updateBell();

            setInterval(function () { self.updateBell(); }, 10000);
        },
        setTitle: function (text) {
            text = (text || '').split(' - ')[0].trim();
            this.el.find('.mobui-head__title').text(text);
        },
        profileName: function () {
            var custom = Lampa.Storage.get('mobui_profile_name', '');
            if (custom) return custom;

            var acc = Lampa.Storage.get('account', '{}') || {};
            if (acc.profile && acc.profile.name) return acc.profile.name;
            if (acc.email) return acc.email.split('@')[0];

            return 'Lampa';
        },
        updateProfile: function () {
            var name = this.profileName();
            $('.mobui-avatar').text(name.charAt(0).toUpperCase());
            $('.mobui-profile__name').text(name);
        },
        updateBell: function () {
            var count = 0;
            try { count = Lampa.Notice.count(); } catch (e) { }
            this.el.find('.mobui-head__bell').toggleClass('has-new', count > 0);
        }
    };

    /* ------------------------------------------------------------------ */
    /* Нижняя панель                                                       */
    /* ------------------------------------------------------------------ */

    var TabBar = {
        el: null,
        init: function () {
            var self = this;
            var tabs = [
                { id: 'main', icon: 'tab-home', label: Lampa.Lang.translate('title_main') },
                { id: 'search', icon: 'tab-search', label: Lampa.Lang.translate('search') },
                { id: 'favorite', icon: 'tab-bookmark', label: Lampa.Lang.translate('settings_input_links') },
                { id: 'settings', icon: 'tab-settings', label: Lampa.Lang.translate('menu_settings') }
            ];

            this.el = $('<div class="mobui-tabbar"><div class="mobui-tabbar__back">' + icon('chevron-left') + '</div><div class="mobui-tabbar__tabs"></div></div>');

            tabs.forEach(function (tab) {
                var item = $('<div class="mobui-tab" data-tab="' + tab.id + '"><div class="mobui-tab__icon">' + icon(tab.icon) + '</div><div class="mobui-tab__label">' + esc(tab.label) + '</div></div>');
                onTap(item, function () { self.go(tab.id); });
                self.el.find('.mobui-tabbar__tabs').append(item);
            });

            onTap(this.el.find('.mobui-tabbar__back'), function () { Lampa.Controller.back(); });

            $('body').append(this.el);

            Lampa.Listener.follow('activity', function (e) {
                if (e.type === 'start' || e.type === 'archive' || e.type === 'destroy') setTimeout(function () { self.update(); }, 50);
            });

            if (Lampa.Controller.listener) {
                Lampa.Controller.listener.follow('toggle', function () { setTimeout(function () { self.update(); }, 50); });
            }

            this.update();
        },
        closeOverlays: function () {
            if ($('body').hasClass('search--open')) {
                try { Lampa.Search.close(); } catch (e) { }
            }
            if ($('body').hasClass('settings--open')) Lampa.Controller.toggle('content');
            Drawer.close(true);
            Notify.close(true);
        },
        go: function (id) {
            if (id === 'search') {
                if ($('body').hasClass('search--open')) return;
                this.closeOverlays();
                Lampa.Search.open();
                return;
            }

            if (id === 'settings') {
                if ($('body').hasClass('settings--open')) return;
                this.closeOverlays();
                Lampa.Controller.toggle('settings');
                return;
            }

            var act = Lampa.Activity.active();
            var onMain = id === 'main' && act && act.component === 'main' && !$('body').hasClass('search--open') && !$('body').hasClass('settings--open');

            this.closeOverlays();
            Lampa.Controller.toggle('content');

            // Уже на главной — не пересоздаём её, а просто поднимаемся наверх
            if (onMain) {
                var scroller = $('.activity--active .activity__body .scroll').eq(0)[0];
                if (scroller) {
                    try { scroller.scrollTo({ top: 0, behavior: 'smooth' }); }
                    catch (e) { scroller.scrollTop = 0; }
                }
                return;
            }

            var item = $('.menu .menu__item[data-action="' + id + '"]').eq(0);

            if (item.length) item.trigger('hover:enter');
            else if (id === 'main') {
                Lampa.Activity.push({ url: '', title: Lampa.Lang.translate('title_main'), component: 'main', source: Lampa.Storage.field('source') });
            }
        },
        current: function () {
            var body = $('body');
            if (body.hasClass('search--open')) return 'search';
            if (body.hasClass('settings--open')) return 'settings';

            var act = Lampa.Activity.active();
            var comp = act && act.component;

            if (comp === 'main') return 'main';
            if (comp === 'bookmarks' || (comp === 'favorite' && act.type === 'book')) return 'favorite';

            return '';
        },
        update: function () {
            var cur = this.current();
            var body = $('body');

            this.el.find('.mobui-tab').each(function () {
                $(this).toggleClass('active', $(this).data('tab') === cur);
            });

            var canBack = body.hasClass('search--open') || body.hasClass('settings--open') || cur !== 'main';
            this.el.toggleClass('with-back', !!canBack);

            Drawer.markActive();
        }
    };

    /* ------------------------------------------------------------------ */
    /* Боковое меню                                                        */
    /* ------------------------------------------------------------------ */

    var MENU_ICONS = {
        main: 'm-home', movie: 'm-movies', tv: 'm-series', cartoon: 'm-cartoons', myperson: 'm-persons',
        catalog: 'm-catalogue', filter: 'm-filter', favorite: 'm-favorites', history: 'm-history',
        subscribes: 'm-subscriptions', timetable: 'm-schedule', mytorrents: 'm-torrents',
        settings: 'm-settings', about: 'm-info', console: 'm-console', edit: 'm-edit'
    };

    var DEFAULT_ORDER = ['main', 'feed', 'movie', 'cartoon', 'tv', 'myperson', 'catalog', 'filter', 'relise', 'anime', 'favorite', 'history', 'subscribes', 'timetable', 'mytorrents'];

    var Drawer = {
        el: null,
        menu: null,
        home: null,
        opened: false,
        editing: false,
        active: 'main',

        init: function () {
            var self = this;

            this.el = $(
                '<div class="mobui-drawer">' +
                    '<div class="mobui-drawer__scrim"></div>' +
                    '<div class="mobui-drawer__panel">' +
                        '<div class="mobui-drawer__body">' +
                            '<div class="mobui-profile"><div class="mobui-avatar"></div><div class="mobui-profile__name"></div></div>' +
                            '<div class="mobui-divider"></div>' +
                            '<div class="mobui-drawer__menu"></div>' +
                        '</div>' +
                        '<div class="mobui-edit">' +
                            '<div class="mobui-edit__head">' + esc(t('edit_menu')) + '</div>' +
                            '<div class="mobui-edit__list"></div>' +
                        '</div>' +
                        '<div class="mobui-edit__buttons">' +
                            '<div class="mobui-btn mobui-btn--ghost mobui-edit__reset">' + esc(t('reset')) + '</div>' +
                            '<div class="mobui-btn mobui-btn--white mobui-edit__done">' + esc(t('done')) + '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>'
            );

            $('body').append(this.el);

            onTap(this.el.find('.mobui-drawer__scrim'), function () {
                if (self.editing) self.stopEdit(false);
                self.close();
            });

            onTap(this.el.find('.mobui-edit__reset'), function () { self.resetEdit(); });
            onTap(this.el.find('.mobui-edit__done'), function () { self.stopEdit(true); });

            // Пункт меню выбран — сначала возвращаем меню на место, потом срабатывают обработчики пункта
            this.el[0].addEventListener('hover:enter', function (e) {
                var item = $(e.target).closest('.menu__item');
                if (!item.length || !self.opened) return;

                var action = item.data('action');
                if (action === 'edit') return;

                if (action) self.active = action;

                self.close();
            }, true);

            // Перехватываем стандартный редактор меню
            Lampa.Listener.follow('menu', function (e) {
                if (e.type === 'action' && e.action === 'edit') {
                    e.abort();
                    if (!self.opened) self.open();
                    self.startEdit();
                }
            });

            // Lampa сама вызывает меню (например, кнопкой «влево» с края) — открываем наше
            this.patchMenuController();

            Lampa.Listener.follow('activity', function (e) {
                if (e.type === 'start' && e.component === 'main') self.active = 'main';
            });

            this.decorate();
        },

        patchMenuController: function () {
            var self = this;

            Lampa.Controller.add('mobui_drawer', {
                toggle: function () {
                    var panel = self.editing ? self.el.find('.mobui-edit') : self.el.find('.mobui-drawer__body');
                    Lampa.Controller.collectionSet(panel);
                    Lampa.Controller.collectionFocus(false, panel);
                },
                up: function () { if (Navigator.canmove('up')) Navigator.move('up'); },
                down: function () { if (Navigator.canmove('down')) Navigator.move('down'); },
                right: function () { self.close(); },
                back: function () {
                    if (self.editing) self.stopEdit(false);
                    else self.close();
                }
            });

            Lampa.Controller.add('menu', {
                toggle: function () { self.open(); },
                back: function () { self.close(); }
            });
        },

        getMenu: function () {
            if (!this.menu || !this.menu.length) this.menu = $('.menu').eq(0);
            return this.menu;
        },

        decorate: function () {
            var menu = this.getMenu();

            menu.find('.menu__item').each(function () {
                var item = $(this);
                var action = item.data('action');
                var name = MENU_ICONS[action];

                if (name && !item.data('mobui-icon')) {
                    item.find('.menu__ico').html(icon(name));
                    item.data('mobui-icon', true);
                }
            });
        },

        markActive: function () {
            var menu = this.getMenu();
            if (!menu) return;

            var cur = TabBar.current ? TabBar.current() : '';
            var active = cur === 'favorite' ? 'favorite' : cur === 'main' ? 'main' : this.active;

            menu.find('.menu__item').removeClass('mobui-active');
            menu.find('.menu__item[data-action="' + active + '"]').eq(0).addClass('mobui-active');
        },

        open: function () {
            if (this.opened) return;

            var menu = this.getMenu();
            if (!menu.length) return;

            Notify.close(true);

            this.decorate();
            this.markActive();
            Header.updateProfile();

            this.home = menu.parent();
            this.el.find('.mobui-drawer__menu').append(menu);

            this.opened = true;
            this.el.addClass('open');
            $('body').addClass('mobui-drawer-open');

            Lampa.Controller.toggle('mobui_drawer');
        },

        close: function (silent) {
            if (!this.opened) return;

            if (this.editing) this.stopEdit(false, true);

            if (this.home && this.home.length) this.home.append(this.getMenu());

            this.opened = false;
            this.el.removeClass('open');
            $('body').removeClass('mobui-drawer-open');

            if (!silent) Lampa.Controller.toggle('content');
        },

        /* --- Редактирование меню --- */

        startEdit: function () {
            var self = this;
            var list = this.el.find('.mobui-edit__list').empty();

            this.getMenu().find('.menu__list').eq(0).find('.menu__item').each(function () {
                list.append(self.editRow($(this)));
            });

            this.editing = true;
            this.el.addClass('editing');

            Lampa.Controller.toggle('mobui_drawer');
        },

        editRow: function (orig) {
            var self = this;
            var action = orig.data('action');
            var checked = !orig.hasClass('hidden');
            var ico = MENU_ICONS[action] ? icon(MENU_ICONS[action]) : orig.find('.menu__ico').html();

            var row = $(
                '<div class="mobui-edit-item selector' + (checked ? ' checked' : '') + '">' +
                    '<div class="mobui-edit-item__content">' +
                        '<div class="mobui-edit-item__check">' + icon('checkbox-on') + icon('checkbox-off') + '</div>' +
                        '<div class="mobui-edit-item__main">' +
                            '<div class="mobui-edit-item__icon">' + ico + '</div>' +
                            '<div class="mobui-edit-item__name"></div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="mobui-edit-item__handle">' + icon('drag-handle') + '</div>' +
                '</div>'
            );

            row.find('.mobui-edit-item__name').text(orig.find('.menu__text').text().trim());
            row.data('orig', orig);
            row.data('action', action);

            var toggle = function () { row.toggleClass('checked'); };

            row.on('hover:enter', toggle);
            row.on('click', function (e) {
                if ($(e.target).closest('.mobui-edit-item__handle').length) return;
                if (e.originalEvent && e.originalEvent.mobuiHandled) return;
            });

            this.bindDrag(row);

            return row;
        },

        bindDrag: function (row) {
            var self = this;
            var handle = row.find('.mobui-edit-item__handle')[0];

            handle.addEventListener('pointerdown', function (e) {
                e.preventDefault();
                e.stopPropagation();

                var list = self.el.find('.mobui-edit__list');
                var startY = e.clientY;
                var rowH = row.outerHeight();
                var offset = 0;

                row.addClass('dragging');
                list.addClass('is-dragging');

                try { handle.setPointerCapture(e.pointerId); } catch (err) { }

                var move = function (ev) {
                    ev.preventDefault();
                    offset = ev.clientY - startY;

                    var prev = row.prev('.mobui-edit-item');
                    var next = row.next('.mobui-edit-item');

                    if (offset < -rowH / 2 && prev.length) {
                        row.insertBefore(prev);
                        startY -= rowH;
                        offset += rowH;
                    }
                    else if (offset > rowH / 2 && next.length) {
                        row.insertAfter(next);
                        startY += rowH;
                        offset -= rowH;
                    }

                    row.css('transform', 'translateY(' + offset + 'px)');
                };

                var up = function () {
                    handle.removeEventListener('pointermove', move);
                    handle.removeEventListener('pointerup', up);
                    handle.removeEventListener('pointercancel', up);

                    row.removeClass('dragging').css('transform', '');
                    list.removeClass('is-dragging');
                };

                handle.addEventListener('pointermove', move);
                handle.addEventListener('pointerup', up);
                handle.addEventListener('pointercancel', up);
            });

            handle.addEventListener('click', function (e) {
                e.stopPropagation();
            }, true);
        },

        resetEdit: function () {
            var list = this.el.find('.mobui-edit__list');
            var rows = list.children('.mobui-edit-item').get();

            rows.sort(function (a, b) {
                var ia = DEFAULT_ORDER.indexOf($(a).data('action'));
                var ib = DEFAULT_ORDER.indexOf($(b).data('action'));
                if (ia < 0) ia = 100 + rows.indexOf(a);
                if (ib < 0) ib = 100 + rows.indexOf(b);
                return ia - ib;
            });

            rows.forEach(function (r) { list.append(r); });
            list.children('.mobui-edit-item').addClass('checked');
        },

        stopEdit: function (save, silent) {
            if (!this.editing) return;

            if (save) {
                var target = this.getMenu().find('.menu__list').eq(0);
                var sort = [];
                var hide = [];

                this.el.find('.mobui-edit__list .mobui-edit-item').each(function () {
                    var row = $(this);
                    var orig = row.data('orig');
                    var name = orig.find('.menu__text').text().trim();
                    var visible = row.hasClass('checked');

                    target.append(orig);
                    orig.toggleClass('hidden', !visible);

                    sort.push(name);
                    if (!visible) hide.push(name);
                });

                Lampa.Storage.set('menu_sort', sort);
                Lampa.Storage.set('menu_hide', hide);
            }

            this.editing = false;
            this.el.removeClass('editing');

            if (!silent) Lampa.Controller.toggle('mobui_drawer');
        }
    };

    /* ------------------------------------------------------------------ */
    /* Карточки и ряды                                                     */
    /* ------------------------------------------------------------------ */

    var Cards = {
        wideTitles: [],

        init: function () {
            var self = this;

            this.wideTitles = ['title_continue', 'title_watched'].map(function (k) { return Lampa.Lang.translate(k); });

            this.scan(document.body);

            if (window.MutationObserver) {
                new MutationObserver(function (mutations) {
                    for (var i = 0; i < mutations.length; i++) {
                        var added = mutations[i].addedNodes;
                        for (var j = 0; j < added.length; j++) {
                            if (added[j].nodeType === 1) self.scan(added[j]);
                        }
                    }
                }).observe(document.body, { childList: true, subtree: true });
            }
        },

        scan: function (root) {
            var self = this;

            if (root.classList && root.classList.contains('items-line')) this.line(root);
            if (root.classList && root.classList.contains('card')) this.card(root);
            if (root.classList && root.classList.contains('items-line__more')) this.more(root);

            if (root.querySelectorAll) {
                var lines = root.querySelectorAll('.items-line');
                for (var i = 0; i < lines.length; i++) this.line(lines[i]);

                var cards = root.querySelectorAll('.card');
                for (var j = 0; j < cards.length; j++) this.card(cards[j]);

                var mores = root.querySelectorAll('.items-line__more');
                for (var k = 0; k < mores.length; k++) this.more(mores[k]);
            }
        },

        more: function (el) {
            var more = $(el);
            if (!more.find('.mobui-chevron').length) more.append('<span class="mobui-chevron">' + icon('chevron-right') + '</span>');
        },

        // Ставит «Продолжить просмотр» сразу после карусели
        moveWide: function (body) {
            var hero = body.children('.mobui-hero');
            if (!hero.length) return;

            var wide = body.children('.items-line.mobui-line--wide');
            if (wide.length) hero.after(wide);
        },

        isWide: function (el) {
            var title = $(el).find('.items-line__title').eq(0).text().trim();
            return this.wideTitles.indexOf(title) >= 0;
        },

        line: function (el) {
            if (el.mobui_line) return;
            el.mobui_line = true;

            if (this.isWide(el)) {
                el.classList.add('mobui-line--wide');
                $(el).find('.card').each(function () { this.mobui_card = false; $(this).find('.mobui-card').remove(); });
                this.scan(el);

                var self = this;
                setTimeout(function () { self.moveWide($(el).parent()); }, 0);
            }
        },

        card: function (el) {
            if (el.mobui_card) return;

            var data = el.card_data;
            if (!data) return;

            el.mobui_card = true;
            el.classList.add('mobui-card-el');

            var view = $(el).find('.card__view');
            var wide = $(el).closest('.mobui-line--wide').length > 0;
            var person = isPerson(data);

            // Бейджи: тип + качество
            if (!person) {
                var badges = badge(isSeries(data) ? t('series') : t('movie'));
                var q = cardQuality(data);
                if (q) badges += badge(q);
                view.append('<div class="mobui-card mobui-badges">' + badges + '</div>');
            }

            // Рейтинг со звездой
            var vote = cardVote(data);
            if (vote && !person) view.append('<div class="mobui-card mobui-card__rating">' + rating(vote) + '</div>');

            // Подпись: жанр • год
            if (!person) {
                var meta = metaLine([cardGenre(data), cardYear(data)]);
                $(el).find('.card__title').after('<div class="mobui-card mobui-meta">' + meta + '</div>');
            }

            if (wide) this.wide(el, data, view);
        },

        wide: function (el, data, view) {
            var back = data.backdrop_path ? tmdbImg(data.backdrop_path, 'w780') : '';
            if (back) view.prepend('<img class="mobui-card mobui-wide-img" src="' + esc(back) + '" />');

            var percent = 0;
            var episode = '';

            try {
                var tl = Lampa.Timeline.watched(data, true);

                if (isSeries(data)) {
                    if (tl && tl.length) {
                        var last = tl[tl.length - 1];
                        percent = last.view.percent || 0;
                        episode = metaLine(['S1', 'E' + last.ep]);
                    }
                }
                else if (tl) percent = tl.percent || 0;
            } catch (e) { }

            if (percent) view.append('<div class="mobui-card mobui-progress"><div style="width:' + Math.min(100, percent) + '%"></div></div>');

            if (episode) {
                var title = $(el).find('.card__title');
                title.wrap('<div class="mobui-card mobui-title-row"></div>');
                title.parent().append('<div class="mobui-episode">' + icon('episode') + '<div class="mobui-episode__text">' + episode + '</div></div>');
            }
        }
    };

    /* ------------------------------------------------------------------ */
    /* Hero-карусель на главной                                            */
    /* ------------------------------------------------------------------ */

    var Hero = {
        timer: null,
        paused: false,

        init: function () {
            var self = this;

            Lampa.Listener.follow('activity', function (e) {
                if (e.component === 'main' && (e.type === 'start' || e.type === 'create')) self.wait(e.object);
                if (e.component === 'main' && e.type === 'start') self.resume();
            });

            var act = Lampa.Activity.active();
            if (act && act.component === 'main') this.wait(act);
        },

        wait: function (object) {
            var self = this;
            var tries = 0;

            var check = function () {
                if (!object || !object.activity) return;

                var render = $(object.activity.render());
                var body = render.find('.scroll__body').eq(0);
                var line = render.find('.items-line').filter(function () {
                    return !Cards.isWide(this) && $(this).find('.card').length >= 3;
                }).eq(0);

                if (body.length && line.length && line.find('.card').length >= 3) {
                    if (!body.children('.mobui-hero').length) self.build(body, line);
                }
                else if (tries++ < 300) setTimeout(check, 50);
            };

            check();
        },

        collect: function (line) {
            var items = [];

            line.find('.card').each(function () {
                var d = this.card_data;
                if (d && d.poster_path && items.length < 8 && !items.find(function (i) { return i.id === d.id; })) items.push(d);
            });

            return items;
        },

        build: function (body, line) {
            var self = this;
            var items = this.collect(line);

            if (!items.length) return;

            var hero = $('<div class="mobui-hero"><div class="mobui-hero__track"></div><div class="mobui-hero__pager"><div class="mobui-hero__dots"></div><div class="mobui-hero__pause">' + icon('pause') + '</div></div></div>');
            var track = hero.find('.mobui-hero__track');
            var dots = hero.find('.mobui-hero__dots');

            items.forEach(function (card, i) {
                var slide = $(
                    '<div class="mobui-hero__slide">' +
                        '<div class="mobui-hero__poster">' +
                            '<img src="' + esc(tmdbImg(card.poster_path, 'w500')) + '" />' +
                            '<div class="mobui-hero__badges">' + badge(isSeries(card) ? t('series') : t('movie'), 'mobui-badge--big') + (cardQuality(card) ? badge(cardQuality(card), 'mobui-badge--big') : '') + '</div>' +
                            '<div class="mobui-hero__rating">' + rating(cardVote(card), true) + '</div>' +
                            '<div class="mobui-hero__bottom">' +
                                '<div class="mobui-btn mobui-btn--white mobui-hero__watch">' + icon('play') + '<span>' + esc(t('watch')) + '</span></div>' +
                                '<div class="mobui-hero__actions">' +
                                    '<div class="mobui-hero__book">' + icon('bookmark-16') + '</div>' +
                                    '<div class="mobui-hero__div"></div>' +
                                    '<div class="mobui-hero__add">' + icon('plus') + '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>'
                );

                onTap(slide.find('.mobui-hero__watch'), function () { watchOnline(card); });
                onTap(slide.find('.mobui-hero__poster img'), function () { openCard(card); });
                onTap(slide.find('.mobui-hero__book'), function () { Lampa.Favorite.toggle('book', card); self.state(slide, card); });
                onTap(slide.find('.mobui-hero__add'), function () { openCard(card); });

                self.state(slide, card);

                track.append(slide);
                dots.append('<div class="mobui-hero__dot' + (i === 0 ? ' active' : '') + '"></div>');
            });

            onTap(hero.find('.mobui-hero__pause'), function () {
                self.paused = !self.paused;
                hero.toggleClass('paused', self.paused);
                self.schedule(hero);
            });

            dots.on('click', '.mobui-hero__dot', function () {
                self.go(hero, $(this).index());
            });

            this.bindSwipe(hero, track);

            hero.data('items', items);
            hero.data('index', 0);
            body.prepend(hero);

            // Первый ряд целиком показан в карусели — прячем его, как в макете
            line.addClass('mobui-hero-source');

            // «Продолжить просмотр» — сразу под каруселью, как в макете
            Cards.moveWide(body);

            this.select(hero, 0, items);
            this.schedule(hero);
        },

        /* Свайп без вложенной прокрутки: трек двигается transform'ом.
           Вложенный scroll-snap в iOS давал мигание старой отрисовки страницы */
        bindSwipe: function (hero, track) {
            var self = this;
            var el = track[0];
            var sx = 0, sy = 0, dx = 0, mode = '', width = 0;

            el.addEventListener('touchstart', function (e) {
                var t = e.touches[0];
                sx = t.clientX; sy = t.clientY; dx = 0; mode = '';
                width = el.clientWidth || 1;
                clearTimeout(self.timer);
            }, { passive: true });

            el.addEventListener('touchmove', function (e) {
                var t = e.touches[0];
                var mx = t.clientX - sx;
                var my = t.clientY - sy;

                if (!mode) {
                    if (Math.abs(mx) < 6 && Math.abs(my) < 6) return;
                    mode = Math.abs(mx) > Math.abs(my) ? 'x' : 'y';
                    if (mode === 'x') track.addClass('dragging');
                }

                if (mode !== 'x') return;

                e.preventDefault();
                dx = mx;

                var index = hero.data('index') || 0;
                var count = track.children().length;
                if ((index === 0 && dx > 0) || (index === count - 1 && dx < 0)) dx = dx / 3;

                self.position(track, index, dx);
            }, { passive: false });

            var end = function () {
                track.removeClass('dragging');

                if (mode === 'x') {
                    hero.data('swiped', Date.now());

                    var index = hero.data('index') || 0;
                    var count = track.children().length;

                    if (dx < -width * 0.18 && index < count - 1) index++;
                    else if (dx > width * 0.18 && index > 0) index--;

                    self.go(hero, index);
                }
                else self.schedule(hero);

                mode = '';
                dx = 0;
            };

            el.addEventListener('touchend', end);
            el.addEventListener('touchcancel', end);

            // Тап сразу после свайпа не должен открывать карточку
            el.addEventListener('click', function (e) {
                if (Date.now() - (hero.data('swiped') || 0) < 350) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            }, true);
        },

        position: function (track, index, dx) {
            track.css('transform', 'translate3d(calc(' + (-index * 100) + '% + ' + (dx || 0) + 'px), 0, 0)');
        },

        state: function (slide, card) {
            var st = {};
            try { st = Lampa.Favorite.check(card) || {}; } catch (e) { }
            slide.find('.mobui-hero__book').toggleClass('on', !!st.book);
        },

        select: function (hero, index, items) {
            hero.find('.mobui-hero__dot').removeClass('active').eq(index).addClass('active');
            hero.data('index', index);

            var card = items[index];
            if (card) Bg.set(tmdbImg(card.poster_path, 'w500'));
        },

        go: function (hero, index) {
            var track = hero.find('.mobui-hero__track');
            var count = track.children().length;
            if (!count) return;

            index = Math.max(0, Math.min(count - 1, index));

            this.position(track, index, 0);
            this.select(hero, index, hero.data('items') || []);
            this.schedule(hero);
        },

        schedule: function (hero) {
            var self = this;
            clearTimeout(this.timer);

            if (this.paused) return;

            this.timer = setTimeout(function () {
                if (!document.body.contains(hero[0])) return;

                if ($('body').hasClass('mobui-drawer-open') || $('body').hasClass('search--open') || $('body').hasClass('settings--open') || !hero.is(':visible')) {
                    return self.schedule(hero);
                }

                var count = hero.find('.mobui-hero__slide').length;
                var next = ((hero.data('index') || 0) + 1) % count;
                self.go(hero, next);
            }, 7000);
        },

        resume: function () {
            var hero = $('.activity--active .mobui-hero');
            if (hero.length) {
                hero.find('.mobui-hero__slide').each(function (i) {
                    var items = hero.data('items') || [];
                    if (items[i]) Hero.state($(this), items[i]);
                });
                this.select(hero, hero.data('index') || 0, hero.data('items') || []);
                this.schedule(hero);
            }
        }
    };

    /* ------------------------------------------------------------------ */
    /* Настройки                                                           */
    /* ------------------------------------------------------------------ */

    var SETTINGS_ICONS = {
        account: 's-sync', interface: 's-interface', content_rows: 's-channels', player: 's-player',
        parser: 's-parser', server: 's-torrserver', tmdb: 's-tmdb', plugins: 's-extensions',
        parental_control: 's-parental', data: 's-cache', backup: 's-cache', remote_configuration: 's-remote', more: 's-other', mobui: 's-interface'
    };

    var SETTINGS_CORE = ['account', 'interface', 'content_rows', 'player', 'parser', 'server', 'tmdb', 'plugins', 'parental_control', 'data', 'backup', 'remote_configuration', 'more', 'lampac', 'appletv'];

    var SETTINGS_BY_NAME = [
        [/uafresh/i, 's-uafresh'],
        [/nova/i, 's-novaplus'],
        [/к[еэ]ш|cache|кеш/i, 's-cache'],
        [/удал[её]нн|віддален|remote/i, 's-remote'],
        [/плагин|плагін|plugin/i, 's-plugins']
    ];

    var Settings = {
        init: function () {
            var self = this;

            Lampa.Settings.listener.follow('open', function (e) {
                if (e.name === 'main') setTimeout(function () { self.decorate(e.body || $('.settings__body')); }, 0);
            });

            Lampa.SettingsApi.addComponent({
                component: 'mobui',
                name: 'Mob UI',
                icon: icon('s-interface')
            });

            Lampa.SettingsApi.addParam({
                component: 'mobui',
                param: { name: 'mobui_profile_name', type: 'input', values: '', default: '', placeholder: 'Lampa' },
                field: { name: t('profile_name'), description: t('profile_name_descr') },
                onChange: function () { Header.updateProfile(); }
            });
        },

        decorate: function (body) {
            body = $(body);

            var folders = body.find('.settings-folder');
            if (!folders.length) return;

            var parent = folders.eq(0).parent();
            var plugins = [];

            folders.each(function () {
                var folder = $(this);
                var comp = folder.data('component') + '';
                var name = folder.find('.settings-folder__name').text();
                var ico = SETTINGS_ICONS[comp];

                if (!ico) {
                    for (var i = 0; i < SETTINGS_BY_NAME.length; i++) {
                        if (SETTINGS_BY_NAME[i][0].test(name) || SETTINGS_BY_NAME[i][0].test(comp)) { ico = SETTINGS_BY_NAME[i][1]; break; }
                    }
                }

                if (ico && !folder.data('mobui')) folder.find('.settings-folder__icon').html(icon(ico));

                if (!folder.find('.mobui-chevron').length) folder.append('<span class="mobui-chevron">' + icon('s-chevron') + '</span>');

                folder.data('mobui', true);

                if (SETTINGS_CORE.indexOf(comp) < 0 && comp !== 'mobui') plugins.push(folder);
            });

            parent.find('.mobui-settings-divider').remove();

            if (plugins.length) {
                parent.append('<div class="mobui-divider mobui-settings-divider"></div>');
                plugins.forEach(function (f) { parent.append(f); });
            }

            // «Mob UI» — последним в основном блоке
            var own = parent.find('[data-component="mobui"]');
            if (own.length) {
                var divider = parent.find('.mobui-settings-divider');
                if (divider.length) divider.before(own);
                else parent.append(own);
            }
        }
    };

    /* ------------------------------------------------------------------ */
    /* Поиск                                                               */
    /* ------------------------------------------------------------------ */

    var Search = {
        init: function () {
            var self = this;

            if (window.MutationObserver) {
                new MutationObserver(function () { self.decorate(); }).observe($('.main-search')[0] || document.body, { childList: true, subtree: true });
            }
        },

        decorate: function () {
            var root = $('.main-search');
            if (!root.length) return;

            var input = root.find('.simple-keyboard-input');

            if (input.length && !input.data('mobui')) {
                input.data('mobui', true);
                input.attr('placeholder', t('search_placeholder'));

                var wrap = $('<div class="mobui-search-field"><div class="mobui-search-field__icon">' + icon('search-20') + '</div><div class="mobui-search-field__clear">' + icon('clear') + '</div></div>');
                input.before(wrap);
                wrap.find('.mobui-search-field__icon').after(input);

                var clear = wrap.find('.mobui-search-field__clear');
                var sync = function () { wrap.toggleClass('filled', !!input.val()); };

                input.on('input keyup change', sync);
                sync();

                onTap(clear, function () {
                    var el = input[0];
                    el.value = '';
                    ['input', 'keyup', 'change'].forEach(function (type) {
                        var ev;
                        try { ev = new Event(type, { bubbles: true }); }
                        catch (err) { ev = document.createEvent('Event'); ev.initEvent(type, true, true); }
                        el.dispatchEvent(ev);
                    });
                    sync();
                    el.focus();
                });
            }

            root.find('.search-history-key').each(function () {
                var key = $(this);
                if (!key.find('.mobui-clock').length) key.children().eq(0).prepend('<span class="mobui-clock">' + icon('clock') + '</span>');
            });

            root.find('.search-source__count').each(function () {
                var c = $(this);
                c.toggleClass('mobui-empty', !c.text().trim() || c.text().trim() === '0');
            });
        }
    };

    /* ------------------------------------------------------------------ */
    /* Уведомления                                                         */
    /* ------------------------------------------------------------------ */

    var Notify = {
        el: null,
        opened: false,

        init: function () {
            var self = this;

            this.el = $(
                '<div class="mobui-sheet">' +
                    '<div class="mobui-sheet__scrim"></div>' +
                    '<div class="mobui-sheet__surface">' +
                        '<div class="mobui-sheet__head">' +
                            '<div class="mobui-sheet__title">' + esc(t('notifications')) + '</div>' +
                            '<div class="mobui-sheet__close">' + icon('close') + '</div>' +
                        '</div>' +
                        '<div class="mobui-sheet__list"></div>' +
                    '</div>' +
                '</div>'
            );

            $('body').append(this.el);

            onTap(this.el.find('.mobui-sheet__scrim'), function () { self.close(); });
            onTap(this.el.find('.mobui-sheet__close'), function () { self.close(); });

            Lampa.Controller.add('mobui_sheet', {
                toggle: function () {
                    Lampa.Controller.collectionSet(self.el.find('.mobui-sheet__surface'));
                    Lampa.Controller.collectionFocus(false, self.el.find('.mobui-sheet__surface'));
                },
                up: function () { if (Navigator.canmove('up')) Navigator.move('up'); },
                down: function () { if (Navigator.canmove('down')) Navigator.move('down'); },
                back: function () { self.close(); }
            });
        },

        items: function () {
            try { return Lampa.Notice.classes.all.items() || []; }
            catch (e) { return []; }
        },

        formatDate: function (time) {
            if (!time) return '';
            var d = new Date(time);
            if (isNaN(d.getTime())) return '';
            try { return d.toLocaleDateString(Lampa.Storage.get('language', 'ru'), { day: 'numeric', month: 'long' }); }
            catch (e) { return d.toDateString(); }
        },

        render: function () {
            var self = this;
            var list = this.el.find('.mobui-sheet__list').empty();
            var items = this.items();

            if (!items.length) {
                var empty = '';
                try { empty = Lampa.Notice.classes.all.empty(); } catch (e) { }
                list.append($('<div class="mobui-sheet__empty"></div>').append(typeof empty === 'string' ? $('<div></div>').html(empty) : empty));
                return;
            }

            items.forEach(function (element, i) {
                var card = element.card || null;
                var poster = element.poster || (card && card.poster_path) || element.icon || element.img || '';

                if (poster && typeof poster === 'object') poster = poster[Lampa.Storage.get('tmdb_lang')] || (card && card.poster_path) || '';
                if (poster && poster.indexOf('http') !== 0 && poster.indexOf('./') !== 0) poster = tmdbImg(poster, 'w300');

                var badges = '';
                if (card) {
                    badges += badge(isSeries(card) ? t('series') : t('movie'));
                    if (cardQuality(card)) badges += badge(cardQuality(card));
                }

                var labels = (element.labels || []).map(function (l) { return translateObj(l); });

                var item = $(
                    '<div class="mobui-notice selector">' +
                        '<div class="mobui-notice__poster">' + (poster ? '<img src="' + esc(poster) + '" />' : '') + (card ? rating(cardVote(card)) : '') + '</div>' +
                        '<div class="mobui-notice__info">' +
                            '<div class="mobui-notice__top"><div class="mobui-notice__badges">' + badges + '</div><div class="mobui-notice__date">' + esc(self.formatDate(element.time)) + '</div></div>' +
                            '<div class="mobui-notice__content">' +
                                '<div class="mobui-notice__title"></div>' +
                                (labels.length ? '<div class="mobui-notice__episode">' + metaLine(labels) + '</div>' : '') +
                                '<div class="mobui-notice__descr"></div>' +
                            '</div>' +
                        '</div>' +
                    '</div>'
                );

                item.find('.mobui-notice__title').html(translateObj(element.title));
                item.find('.mobui-notice__descr').html(translateObj(element.text));

                var go = function () {
                    if (!card) return;
                    self.close(true);
                    Lampa.Activity.push({
                        url: '',
                        component: 'full',
                        id: card.id,
                        method: element.method || (card.number_of_seasons || card.seasons || isSeries(card) ? 'tv' : 'movie'),
                        card: card,
                        source: card.source || Lampa.Storage.field('source')
                    });
                };

                item.on('hover:enter', go);
                onTap(item, go);

                if (i > 0) list.append('<div class="mobui-divider"></div>');
                list.append(item);
            });
        },

        open: function () {
            if (this.opened) return;

            Drawer.close(true);

            this.render();
            this.opened = true;
            this.el.addClass('open');
            $('body').addClass('mobui-sheet-open');

            try { Lampa.Notice.classes.all.viewed(); Lampa.Notice.drawCount(); } catch (e) { }

            Lampa.Controller.toggle('mobui_sheet');
        },

        close: function (silent) {
            if (!this.opened) return;

            this.opened = false;
            this.el.removeClass('open');
            $('body').removeClass('mobui-sheet-open');

            Header.updateBell();

            if (!silent) Lampa.Controller.toggle('content');
        }
    };

    /* ------------------------------------------------------------------ */
    /* Запуск                                                              */
    /* ------------------------------------------------------------------ */

    /* Статус-бар iOS: страница уходит под него, без отдельной подложки */
    var StatusBar = {
        color: '#0b0605',
        init: function () {
            var self = this;
            var head = document.head;

            var viewport = head.querySelector('meta[name="viewport"]');
            if (viewport && viewport.content.indexOf('viewport-fit') < 0) viewport.content += ', viewport-fit=cover';

            var style = head.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
            if (!style) {
                style = document.createElement('meta');
                style.name = 'apple-mobile-web-app-status-bar-style';
                head.appendChild(style);
            }
            style.content = 'black-translucent';

            var theme = head.querySelector('meta[name="theme-color"]');
            if (!theme) {
                theme = document.createElement('meta');
                theme.name = 'theme-color';
                head.appendChild(theme);
            }

            var lock = function () {
                if (theme.getAttribute('content') !== self.color) theme.setAttribute('content', self.color);
            };

            lock();

            // Фон Lampa перекрашивает theme-color под картинку — возвращаем свой
            if (window.MutationObserver) new MutationObserver(lock).observe(theme, { attributes: true, attributeFilter: ['content'] });

            document.documentElement.style.backgroundColor = self.color;
        }
    };

    function isMobile() {
        try { if (Lampa.Platform.screen('mobile')) return true; } catch (e) { }
        return window.innerWidth <= 600 && ('ontouchstart' in window);
    }

    function start() {
        if (window.mobui_started) return;
        window.mobui_started = true;

        Lampa.Manifest && Lampa.Manifest.plugins && Lampa.Manifest.plugins.push && Lampa.Manifest.plugins.push({ type: 'other', name: 'Mob UI', version: VERSION });

        if (!isMobile()) {
            console.log('MobUI', 'not a mobile screen, skip');
            return;
        }

        $('head').append('<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Roboto+Mono:wght@400;500;700&display=swap">');
        $('head').append('<style id="mobui-style">' + CSS + '</style>');

        document.body.classList.add('mobui');

        StatusBar.init();

        var parts = [Bg, Header, Notify, TabBar, Drawer, Cards, Hero, Settings, Search];

        parts.forEach(function (part) {
            try { part.init(); }
            catch (e) { console.error('MobUI', 'init error', e); }
        });

        console.log('MobUI', 'started', VERSION);
    }

    function boot() {
        if (!window.Lampa || !Lampa.Listener) return setTimeout(boot, 200);

        if (window.appready) start();
        else {
            Lampa.Listener.follow('app', function (e) {
                if (e.type === 'ready') start();
            });
        }
    }

    boot();
})();
