/*!
 * Lampa Mob UI — мобильный интерфейс для Lampa по макетам из Figma (файл «lampac»).
 * https://github.com/werpenart/Lampa-Mob-UI-
 */
(function () {
    'use strict';

    if (window.mobui_plugin_loaded) return;
    window.mobui_plugin_loaded = true;

    var VERSION = '0.1.25';
    var ICONS = /*@ICONS@*/{};
    var CSS = /*@CSS@*/'';

    /* ------------------------------------------------------------------ */
    /* Утилиты                                                             */
    /* ------------------------------------------------------------------ */

    var I18N = {
        ru: { movie: 'Фильм', series: 'Сериал', watch: 'Смотреть', more: 'Ещё', edit_menu: 'Редактировать меню', reset: 'Сбросить', done: 'Готово', notifications: 'Уведомления', search_placeholder: 'Фильмы, сериалы, люди', profile: 'Профиль', profile_name: 'Имя в меню', profile_name_descr: 'Отображается в шапке бокового меню', quality: 'Качество на постерах', quality_descr: 'Alloha, затем торренты (JacRed)', alloha: 'Токен Alloha', alloha_descr: 'Для качества на постерах. Без токена — JacRed' },
        uk: { movie: 'Фільм', series: 'Серіал', watch: 'Дивитися', more: 'Ще', edit_menu: 'Редагувати меню', reset: 'Скинути', done: 'Готово', notifications: 'Сповіщення', search_placeholder: 'Фільми, серіали, люди', profile: 'Профіль', profile_name: "Ім'я в меню", profile_name_descr: 'Відображається у шапці бічного меню', quality: 'Якість на постерах', quality_descr: 'Alloha, потім торренти (JacRed)', alloha: 'Токен Alloha', alloha_descr: 'Для якості на постерах. Без токена — JacRed' },
        en: { movie: 'Movie', series: 'Series', watch: 'Watch', more: 'More', edit_menu: 'Edit Menu', reset: 'Reset', done: 'Done', notifications: 'Notifications', search_placeholder: 'Movies, series, people', profile: 'Profile', profile_name: 'Menu name', profile_name_descr: 'Shown at the top of the side menu', quality: 'Quality on posters', quality_descr: 'Alloha, then torrents (JacRed)', alloha: 'Alloha token', alloha_descr: 'For poster quality. Without it — JacRed' }
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

    function hms(sec) {
        sec = Math.max(0, Math.round(sec || 0));
        var h = Math.floor(sec / 3600), m = Math.floor(sec % 3600 / 60), s = sec % 60;
        return [h, m, s].map(function (n) { return (n < 10 ? '0' : '') + n; }).join(':');
    }

    function cardVote(card) {
        var v = parseFloat(card.vote_average || 0);
        return v > 0 ? (v >= 10 ? '10' : v.toFixed(1)) : '';
    }

    // Только понятные метки: 4K / FHD / HD / SD / CamRip (WEB-DL, BDRip и т.п. не показываем)
    function normQuality(q) {
        q = typeof q === 'string' ? q : '';
        if (!q) return '';
        if (/\b(cam|camrip|ts|telesync|tc|hdcam|hdts)\b/i.test(q)) return 'CamRip';
        if (/2160|4k|uhd/i.test(q)) return '4K';
        if (/1080|fhd|full\s*hd/i.test(q)) return 'FHD';
        if (/720|\bhd\b/i.test(q)) return 'HD';
        if (/480|576|\bsd\b/i.test(q)) return 'SD';
        return '';
    }

    function cardQuality(card) {
        return normQuality(card.release_quality || card.quality || '');
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
        // Закрывает всё, что открыто поверх страниц: меню, уведомления, поиск, настройки,
        // «Расширения», модальные окна. Идём «назад», пока не вернёмся к контенту
        closeOverlays: function () {
            Drawer.close(true);
            Notify.close(true);

            if ($('body').hasClass('search--open')) {
                try { Lampa.Search.close(); } catch (e) { }
            }

            for (var guard = 0; guard < 8; guard++) {
                var name = this.controller();
                if (!name || name === 'content' || name === 'head' || name.indexOf('mobui_') === 0) break;

                Lampa.Controller.back();
            }

            if (this.controller() !== 'content') Lampa.Controller.toggle('content');
        },
        controller: function () {
            try { return (Lampa.Controller.enabled() || {}).name || ''; }
            catch (e) { return ''; }
        },
        // Открыто что-то поверх страниц (окно Lampa, «Расширения» и т.п.)
        overlay: function () {
            var name = this.controller();
            return !!name && ['content', 'head', 'menu', 'mobui_drawer', 'mobui_sheet'].indexOf(name) < 0;
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
            var onMain = id === 'main' && act && act.component === 'main' && !$('body').hasClass('search--open') && !this.overlay();

            this.closeOverlays();

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

            var ctrl = this.controller();
            if (ctrl.indexOf('extensions') === 0 || ctrl.indexOf('settings') === 0) return 'settings';
            if (this.overlay()) return '';

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
                            '<div class="mobui-edit__buttons">' +
                                '<div class="mobui-btn mobui-btn--ghost mobui-edit__reset">' + esc(t('reset')) + '</div>' +
                                '<div class="mobui-btn mobui-btn--white mobui-edit__done">' + esc(t('done')) + '</div>' +
                            '</div>' +
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

        // Свой ряд «Продолжить просмотр» есть — стандартный (только сериалы) на этой странице прячем
        ownContinue: function (cardEl) {
            var line = $(cardEl).closest('.items-line');
            if (!line.length || line.hasClass('mobui-own-continue')) return;

            line.addClass('mobui-own-continue');
            this.hideDuplicates(line.parent());
        },

        hideDuplicates: function (body) {
            if (!body.children('.mobui-own-continue').length) return;
            body.children('.items-line.mobui-line--wide').not('.mobui-own-continue').addClass('mobui-hidden-line');
        },

        more: function (el) {
            var more = $(el);
            if (!more.find('.mobui-chevron').length) more.append('<span class="mobui-chevron">' + icon('chevron-right') + '</span>');
        },

        // Ставит «Продолжить просмотр» сразу после карусели
        moveWide: function (body) {
            var hero = body.children('.mobui-hero');
            if (!hero.length) return;

            var wide = body.children('.items-line.mobui-line--wide').not('.mobui-hidden-line');
            if (wide.length) hero.after(wide.eq(0));
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
                setTimeout(function () {
                    self.hideDuplicates($(el).parent());
                    self.moveWide($(el).parent());
                }, 0);
            }
        },

        card: function (el) {
            if (el.mobui_card) return;

            var data = el.card_data;
            if (!data) return;

            el.mobui_card = true;
            el.classList.add('mobui-card-el');

            if (data.mobui_continue) this.ownContinue(el);

            var view = $(el).find('.card__view');
            var wide = $(el).closest('.mobui-line--wide').length > 0;
            var person = isPerson(data);

            // Бейджи: тип + качество
            if (!person) {
                var badges = badge(isSeries(data) ? t('series') : t('movie'));
                var q = cardQuality(data);
                if (q) badges += badge(q);

                var box = $('<div class="mobui-card mobui-badges">' + badges + '</div>');
                view.append(box);

                if (!q) {
                    el.mobui_qkey = Quality.key(data);
                    el.mobui_qapply = function (quality) {
                        var b = box.find('.mobui-badge--q');
                        if (b.length) b.text(quality);
                        else box.append(badge(quality, 'mobui-badge--q'));
                    };
                    Quality.watch(el, data, el.mobui_qapply);
                }
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
            // Кадр — случайный из первых трёх на TMDB (без текста), по центру — логотип
            var img = $('<img class="mobui-card mobui-wide-img" />');
            var logo = $('<img class="mobui-card mobui-wide-logo" />');

            img.on('load', function () { img.addClass('loaded'); });
            logo.on('load', function () {
                if (Art.isDark(logo[0])) logo.addClass('mobui-wide-logo--light');
                logo.addClass('loaded');
            });

            // Логотип читаем на любом кадре: картинку загружаем с CORS, чтобы узнать её яркость.
            // Если сервер картинок CORS не даёт — грузим как обычно, без проверки
            logo[0].crossOrigin = 'anonymous';
            logo.on('error', function () {
                if (logo[0].crossOrigin) {
                    var src = logo.attr('src');
                    logo[0].removeAttribute('crossorigin');
                    logo.attr('src', src);
                }
            });

            view.prepend(img);
            view.append('<div class="mobui-card mobui-wide-scrim"></div>');
            view.append(logo);

            Art.get(data, function (art) {
                // Жанр перед годом (в истории Lampa жанров нет)
                var meta = $(el).find('.mobui-meta');
                if (art.genre && meta.length && !cardGenre(data)) meta.html(metaLine([art.genre, cardYear(data)])).show();

                var list = art.backdrops.length ? art.backdrops : (data.backdrop_path ? [data.backdrop_path] : []);
                if (list.length) img.attr('src', tmdbImg(list[Math.floor(Math.random() * list.length)], 'w780'));
                if (art.logo) logo.attr('src', tmdbImg(art.logo, 'w500'));
            });

            var percent = 0;
            var episode = '';
            var times = '';

            try {
                var tl = Lampa.Timeline.watched(data, true);

                if (isSeries(data)) {
                    if (tl && tl.length) {
                        var last = tl[tl.length - 1];
                        percent = last.view.percent || 0;
                        episode = metaLine(['S1', 'E' + last.ep]);
                    }
                }
                else if (tl) {
                    percent = tl.percent || 0;

                    // Где остановился и сколько идёт фильм: 00:30:00 • 01:45:00
                    if (tl.duration > 0 && tl.time > 0) times = metaLine([hms(tl.time), hms(tl.duration)]);
                }
            } catch (e) { }

            // Прогресс — только у фильмов: у сериалов вместо него сезон и серия
            if (percent && !isSeries(data)) {
                view.addClass('mobui-has-progress');
                view.append('<div class="mobui-card mobui-progress"><div style="width:' + Math.min(100, percent) + '%"></div></div>');
            }

            if (times && percent) {
                var meta = $(el).find('.mobui-meta');
                meta.wrap('<div class="mobui-card mobui-meta-row"></div>');
                meta.parent().append('<div class="mobui-time">' + times + '</div>');
            }

            if (episode) {
                var title = $(el).find('.card__title');
                title.wrap('<div class="mobui-card mobui-title-row"></div>');
                title.parent().append('<div class="mobui-episode">' + icon('episode') + '<div class="mobui-episode__text">' + episode + '</div></div>');
            }
        }
    };


    /* ------------------------------------------------------------------ */
    /* Кадры и логотипы с TMDB                                             */
    /* ------------------------------------------------------------------ */

    var Art = {
        CACHE_KEY: 'mobui_art_v2',
        TTL: 7 * 24 * 3600 * 1000,
        cache: null,
        waiting: {},

        load: function () {
            if (this.cache) return;
            try { this.cache = JSON.parse(localStorage.getItem(this.CACHE_KEY) || '{}') || {}; }
            catch (e) { this.cache = {}; }
        },

        save: function () {
            var self = this;
            clearTimeout(this.timer);
            this.timer = setTimeout(function () {
                var keys = Object.keys(self.cache);
                if (keys.length > 400) {
                    keys.sort(function (a, b) { return self.cache[a].t - self.cache[b].t; });
                    keys.slice(0, keys.length - 300).forEach(function (k) { delete self.cache[k]; });
                }
                try { localStorage.setItem(self.CACHE_KEY, JSON.stringify(self.cache)); } catch (e) { }
            }, 1000);
        },

        // Тёмный логотип (как синяя надпись The Odyssey) на кадре не читается —
        // такие перекрашиваем в белый
        isDark: function (img) {
            try {
                var w = 48, h = Math.max(8, Math.round(48 * img.naturalHeight / Math.max(1, img.naturalWidth)));
                var canvas = document.createElement('canvas');
                canvas.width = w; canvas.height = h;
                var ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, w, h);

                var px = ctx.getImageData(0, 0, w, h).data;
                var sum = 0, n = 0;

                for (var i = 0; i < px.length; i += 4) {
                    if (px[i + 3] < 128) continue;
                    sum += (0.2126 * px[i] + 0.7152 * px[i + 1] + 0.0722 * px[i + 2]) / 255;
                    n++;
                }

                return n > 0 && sum / n < 0.55;
            } catch (e) { return false; }
        },

        // Логотип: на языке интерфейса, затем английский, затем любой
        pickLogo: function (logos) {
            var lang = (Lampa.Storage.field('tmdb_lang') || Lampa.Storage.get('language', 'ru') || 'ru').split(/[-_]/)[0];
            var order = [lang, 'en', null];

            for (var i = 0; i < order.length; i++) {
                var found = logos.filter(function (l) { return (l.iso_639_1 || null) === order[i] && !/\.svg$/i.test(l.file_path); });
                if (found.length) return found[0].file_path;
            }

            return logos.length ? logos[0].file_path : '';
        },

        get: function (card, cb) {
            this.load();

            var key = (isSeries(card) ? 'tv' : 'movie') + '_' + card.id;
            var c = this.cache[key];

            if (c && Date.now() - c.t < this.TTL) return cb(c);

            if (this.waiting[key]) return this.waiting[key].push(cb);
            this.waiting[key] = [cb];

            var self = this;
            var lang = (Lampa.Storage.field('tmdb_lang') || Lampa.Storage.get('language', 'ru') || 'ru').split(/[-_]/)[0];
            // Одним запросом: карточка (жанры — в истории Lampa их не хранит) + кадры и логотипы
            var method = (isSeries(card) ? 'tv' : 'movie') + '/' + card.id + '?append_to_response=images&include_image_language=' + lang + ',en,null';

            var finish = function (art) {
                var cbs = self.waiting[key] || [];
                delete self.waiting[key];
                cbs.forEach(function (f) { try { f(art); } catch (e) { } });
            };

            try {
                Lampa.Api.sources.tmdb.get(method, {}, function (json) {
                    var images = json.images || json;

                    // Кадры без текста — в том порядке, как на сайте TMDB, первые три
                    var backs = (images.backdrops || []).filter(function (b) { return !b.iso_639_1; });
                    if (!backs.length) backs = images.backdrops || [];

                    var art = {
                        backdrops: backs.slice(0, 3).map(function (b) { return b.file_path; }),
                        logo: self.pickLogo(images.logos || []),
                        genre: json.genres && json.genres.length ? json.genres[0].name : '',
                        t: Date.now()
                    };

                    self.cache[key] = art;
                    self.save();
                    finish(art);
                }, function () {
                    finish({ backdrops: [], logo: '' });
                });
            } catch (e) { finish({ backdrops: [], logo: '' }); }
        }
    };

    /* ------------------------------------------------------------------ */
    /* Качество из торрентов                                               */
    /* ------------------------------------------------------------------ */

    // Лучшее качество, в котором фильм уже раздают, берётся из того же парсера,
    // что и торренты в Lampa (у Lampac это JacRed). Результат кешируется на сутки
    var Quality = {
        CACHE_KEY: 'mobui_quality_v5',
        TTL_FOUND: 24 * 3600 * 1000,
        TTL_EMPTY: 2 * 3600 * 1000,
        KEEP: 30 * 24 * 3600 * 1000,
        MAX_PARALLEL: 6,
        RETRY_DELAYS: [8000, 25000],

        cache: null,
        queue: [],
        waiting: {},
        retries: {},
        active: 0,
        observer: null,
        saveTimer: null,

        init: function () {
            var self = this;

            try { this.cache = JSON.parse(localStorage.getItem(this.CACHE_KEY) || '{}') || {}; }
            catch (e) { this.cache = {}; }

            if (window.IntersectionObserver) {
                this.observer = new IntersectionObserver(function (entries) {
                    entries.forEach(function (entry) {
                        if (!entry.isIntersecting) return;
                        self.observer.unobserve(entry.target);
                        var job = entry.target.mobui_quality_job;
                        if (job) job();
                    });
                }, { rootMargin: '200px' });
            }
        },

        enabled: function () {
            var v = Lampa.Storage.get('mobui_quality', 'true');
            return v !== false && v !== 'false';
        },

        parser: function () {
            var url = Lampa.Storage.field('jackett_url') || '';
            if (!url) return null;

            try { url = Lampa.Utils.checkEmptyUrl(url); }
            catch (e) { if (!/^https?:/.test(url)) url = location.protocol + '//' + url; }

            return { url: url.replace(/\/+$/, '').replace('jacred.xyz', 'jac.red'), key: Lampa.Storage.field('jackett_key') || '' };
        },

        key: function (card) {
            return (isSeries(card) ? 'tv' : 'movie') + '_' + card.id;
        },

        // Сменился токен — забываем пустые результаты, чтобы перепроверить с Alloha
        reset: function () {
            var self = this;
            Object.keys(this.cache).forEach(function (k) { if (!self.cache[k].q) delete self.cache[k]; });
            try { localStorage.setItem(this.CACHE_KEY, JSON.stringify(this.cache)); } catch (e) { }
        },

        // Запись из кеша: показываем сразу, даже устаревшую; fresh — можно не перепроверять
        entry: function (card) {
            var c = this.cache[this.key(card)];
            if (!c) return null;
            var age = Date.now() - c.t;
            if (age > this.KEEP) return null;
            return { q: c.q, fresh: age < (c.q ? this.TTL_FOUND : this.TTL_EMPTY) };
        },

        store: function (card, q) {
            var self = this;
            this.cache[this.key(card)] = { q: q || '', t: Date.now() };

            clearTimeout(this.saveTimer);
            this.saveTimer = setTimeout(function () {
                var keys = Object.keys(self.cache);
                if (keys.length > 1500) {
                    keys.sort(function (a, b) { return self.cache[a].t - self.cache[b].t; });
                    keys.slice(0, keys.length - 1200).forEach(function (k) { delete self.cache[k]; });
                }
                try { localStorage.setItem(self.CACHE_KEY, JSON.stringify(self.cache)); } catch (e) { }
            }, 1000);
        },

        /* Разбор названий раздач */
        resolution: function (item) {
            var info = item.Info || {};
            if (info.quality) return info.quality;

            var t = item.Title || '';
            if (/\b(2160p|4k|uhd)\b/i.test(t)) return 2160;
            if (/\b(1080[pi]|fhd)\b/i.test(t)) return 1080;
            if (/\b720p\b/i.test(t)) return 720;
            if (/\b(480p|576p|dvdrip|satrip|tvrip|vhsrip)\b/i.test(t)) return 480;
            return 0;
        },

        isCam: function (item) {
            return /\b(cam|camrip|hdcam|ts|hdts|telesync|tc|telecine|screener|scr)\b/i.test(item.Title || '');
        },

        best: function (results, card) {
            var self = this;
            var year = parseInt(cardYear(card), 10);
            var res = 0;
            var cam = false;
            var any = false;

            results.forEach(function (item) {
                var title = item.Title || '';

                // Чужие раздачи с другим годом выпуска отбрасываем
                if (year) {
                    var years = title.match(/\b(19[2-9]\d|20[0-4]\d)\b/g);
                    if (years && !years.some(function (y) { return Math.abs(parseInt(y, 10) - year) <= 1; })) return;
                }

                if (item.Seeders === 0 && results.length > 5) return;

                any = true;

                if (self.isCam(item)) { cam = true; return; }

                var r = self.resolution(item);
                if (r > res) res = r;
            });

            if (res >= 2160) return '4K';
            if (res >= 1080) return 'FHD';
            if (res >= 720) return 'HD';
            if (res > 0) return 'SD';
            if (cam && any) return 'CamRip';
            return '';
        },

        // Публичный JacRed: сам разбирает качество раздач (поле quality) и ищет точно
        // по названию и году — так же получают качество другие плагины Lampa
        JACRED: 'https://jac.red',

        bestJac: function (list, card) {
            var self = this;
            var year = parseInt(cardYear(card), 10);
            var series = isSeries(card);
            var res = 0, cam = false, any = false;

            list.forEach(function (item) {
                // У сериала каждый сезон со своим годом: отбрасываем только раздачи старше премьеры
                if (year && item.relased && (series ? item.relased < year - 1 : Math.abs(item.relased - year) > 1)) return;

                any = true;

                if (self.isCam({ Title: item.title })) { cam = true; return; }

                var q = item.quality || self.resolution({ Title: item.title });
                if (q > res) res = q;
            });

            if (res >= 2160) return '4K';
            if (res >= 1080) return 'FHD';
            if (res >= 720) return 'HD';
            if (res > 0) return 'SD';
            if (cam && any) return 'CamRip';
            return '';
        },

        request: function (url, parse, done) {
            var finished = false;
            var finish = function (q) { if (finished) return; finished = true; done(q); };

            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.timeout = 15000;
            xhr.onload = function () {
                if (xhr.status !== 200) return finish(null);
                try { finish(parse(JSON.parse(xhr.responseText))); }
                catch (e) { finish(null); }
            };
            xhr.onerror = xhr.ontimeout = function () { finish(null); };
            xhr.send();
        },

        // Порядок: Alloha (по TMDB ID, если задан токен) → JacRed
        fetch: function (card, done) {
            var self = this;

            this.fetchAlloha(card, function (q) {
                if (q) done(q);
                else self.fetchJac(card, done);
            });
        },

        ALLOHA: 'https://apbugall.org',

        bestAlloha: function (data) {
            if (!data) return '';

            var res = 0;
            var uhd = data.flags && data.flags.uhd;

            (data.translations || []).forEach(function (tr) {
                if (tr.uhd) uhd = true;
                (tr.resolutions || []).forEach(function (r) { if (r > res) res = r; });
            });

            if (uhd || res >= 2160) return '4K';
            if (res >= 1080) return 'FHD';
            if (res >= 720) return 'HD';

            var names = [].concat(data.quality || []).concat((data.translations || []).map(function (tr) { return tr.quality || ''; })).join(' ');

            if (/\b(cam|camrip|ts|telesync|tc|hdcam|hdts)\b/i.test(names)) return 'CamRip';
            if (/2160|4k|uhd/i.test(names)) return '4K';
            if (/1080/i.test(names)) return 'FHD';
            if (/720/i.test(names)) return 'HD';
            if (res > 0) return 'SD';

            return '';
        },

        // Сериалы в Alloha бывают в разных категориях (serial, tv-show, anime-serial) —
        // пробуем по очереди, пока не найдём
        fetchAlloha: function (card, done) {
            var token = (Lampa.Storage.get('mobui_alloha_token', '') + '').trim();
            if (!token) return done('');

            var self = this;
            var cats = isSeries(card) ? ['serial', 'tv-show', 'anime-serial'] : ['movie', 'anime'];

            var next = function (i) {
                if (i >= cats.length) return done('');

                var url = self.ALLOHA + '/v2/movies/tmdb/' + card.id + '?category=' + cats[i];
                var finished = false;
                var finish = function (data) {
                    if (finished) return;
                    finished = true;

                    if (data === undefined) next(i + 1);
                    else done(self.bestAlloha(data));
                };

                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);
                xhr.timeout = 10000;
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
                xhr.setRequestHeader('Accept', 'application/json');
                xhr.onload = function () {
                    if (xhr.status === 404) return finish(undefined);
                    if (xhr.status !== 200) return finish(null);
                    try {
                        var json = JSON.parse(xhr.responseText);
                        finish(json && json.data ? json.data : undefined);
                    } catch (e) { finish(null); }
                };
                xhr.onerror = xhr.ontimeout = function () { finish(null); };
                xhr.send();
            };

            next(0);
        },

        fetchJac: function (card, done) {
            var self = this;
            var title = card.title || card.name || '';
            var original = card.original_title || card.original_name || title;
            var year = cardYear(card);

            var url = this.JACRED + '/api/v1.0/torrents?search=' + encodeURIComponent(original || title) +
                (title && title !== original ? '&altname=' + encodeURIComponent(title) : '') +
                '&exact=true&type=' + (isSeries(card) ? 'serial' : 'movie') +
                (year && !isSeries(card) ? '&relased=' + year : '');

            this.request(url, function (json) {
                return self.bestJac(Array.isArray(json) ? json : [], card);
            }, function (q) {
                // JacRed недоступен — спрашиваем парсер из настроек Lampa
                if (q === null) self.fetchParser(card, done);
                else done(q);
            });
        },

        fetchParser: function (card, done) {
            var p = this.parser();
            if (!p) return done(null);

            var title = card.title || card.name || '';
            var original = card.original_title || card.original_name || title;
            var year = cardYear(card);

            var url = p.url + '/api/v2.0/indexers/all/results?apikey=' + encodeURIComponent(p.key) +
                '&Query=' + encodeURIComponent(original || title) +
                '&title=' + encodeURIComponent(title) +
                '&title_original=' + encodeURIComponent(original) +
                '&year=' + encodeURIComponent(year || '0000') +
                '&is_serial=' + (isSeries(card) ? '2' : '1') +
                '&Category[]=' + (isSeries(card) ? '5000' : '2000');

            var self = this;

            this.request(url, function (json) {
                return self.best(json.Results || [], card);
            }, done);
        },

        pump: function () {
            var self = this;

            while (this.active < this.MAX_PARALLEL && this.queue.length) {
                var card = this.queue.shift();
                var key = this.key(card);

                this.active++;

                (function (card, key) {
                    self.fetch(card, function (q) {
                        self.active--;

                        // null — парсер не ответил (таймаут, 502): не кешируем и пробуем позже ещё раз
                        if (q === null) {
                            var n = self.retries[key] || 0;
                            if (n < self.RETRY_DELAYS.length) {
                                self.retries[key] = n + 1;
                                setTimeout(function () { self.queue.push(card); self.pump(); }, self.RETRY_DELAYS[n]);
                                self.pump();
                                return;
                            }
                        }
                        else self.store(card, q);

                        delete self.retries[key];

                        var cbs = self.waiting[key] || [];
                        delete self.waiting[key];
                        cbs.forEach(function (cb) { try { cb(q || ''); } catch (e) { } });

                        if (q) self.broadcast(key, q);

                        self.pump();
                    });
                })(card, key);
            }
        },

        // Сразу отдаёт качество из кеша (если есть) и в фоне обновляет устаревшее
        get: function (card, cb, first) {
            if (!card || !card.id || !this.enabled()) return;

            var c = this.entry(card);
            if (c && c.q) cb(c.q);
            if (c && c.fresh) return;

            var key = this.key(card);

            if (this.waiting[key]) { this.waiting[key].push(function (v) { if (v) cb(v); }); return; }

            this.waiting[key] = [function (v) { if (v) cb(v); }];
            if (first) this.queue.unshift(card);
            else this.queue.push(card);
            this.pump();
        },

        // Один и тот же фильм бывает в нескольких рядах: бейдж получают все его карточки
        broadcast: function (key, q) {
            $('.mobui-card-el').each(function () {
                if (this.mobui_qkey === key && this.mobui_qapply) this.mobui_qapply(q);
            });
            $('.mobui-hero__slide').each(function () {
                if (this.mobui_qkey === key && this.mobui_qapply) this.mobui_qapply(q);
            });
        },

        // Запрос — только когда карточка попала на экран
        // Запрашиваем сразу при появлении карточки, не дожидаясь прокрутки до неё
        watch: function (el, card, cb) {
            this.get(card, cb);
        }
    };

    /* ------------------------------------------------------------------ */
    /* «Продолжить просмотр» на главной: фильмы и сериалы                  */
    /* ------------------------------------------------------------------ */

    // В Lampa на главной этот ряд показывает только сериалы. Как в макете,
    // собираем свой: всё из истории просмотра (кроме досмотренного и брошенного)
    var Continue = {
        registered: false,

        register: function () {
            if (this.registered || !Lampa.ContentRows || !Lampa.ContentRows.add) return;
            this.registered = true;

            Lampa.ContentRows.add({
                name: 'mobui_continue',
                title: Lampa.Lang.translate('title_continue'),
                index: 0,
                screen: ['main'],
                call: function () {
                    var results = Continue.items();
                    if (!results.length) return;

                    return function (call) {
                        call({ results: results, title: Lampa.Lang.translate('title_continue') });
                    };
                }
            });
        },

        items: function () {
            var history = [], viewed = [], thrown = [];

            try {
                history = Lampa.Favorite.get({ type: 'history' }) || [];
                viewed = Lampa.Favorite.get({ type: 'viewed' }) || [];
                thrown = Lampa.Favorite.get({ type: 'thrown' }) || [];
            } catch (e) { return []; }

            var skip = {};
            viewed.concat(thrown).forEach(function (c) { if (c) skip[c.id] = true; });

            return history.filter(function (c) {
                return c && c.id && !skip[c.id] && (c.poster_path || c.backdrop_path);
            }).slice(0, 20).map(function (c) {
                var card = $.extend({}, c);
                card.mobui_continue = true;
                return card;
            });
        }
    };

    /* ------------------------------------------------------------------ */
    /* Hero-карусель на главной                                            */
    /* ------------------------------------------------------------------ */

    var SLIDE_TIME = 7000;

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
                var line = self.sourceLine(render);

                // Через ~4 с без нужного ряда — берём первый обычный ряд
                if (!line.length && tries > 80) {
                    line = render.find('.items-line').filter(function () {
                        return !Cards.isWide(this) && $(this).find('.card').length >= 3;
                    }).eq(0);
                }

                if (body.length && line.length && line.find('.card').length >= 3) {
                    if (!body.children('.mobui-hero').length) self.build(body, line);
                }
                else if (tries++ < 400) setTimeout(check, 50);
            };

            check();
        },

        // Источник слайдера — новинки: ряд «Сейчас смотрят» (в кино/цифре сейчас),
        // если его нет — «Сегодня в тренде». Рекомендации и прочие ряды не берём
        sourceLine: function (render) {
            var lines = render.find('.items-line').filter(function () {
                return !Cards.isWide(this) && $(this).find('.card').length >= 3;
            });

            var titles = ['title_now_watch', 'title_trend_day', 'title_trend_week'].map(function (k) { return Lampa.Lang.translate(k); });

            for (var i = 0; i < titles.length; i++) {
                var found = lines.filter(function () {
                    return $(this).find('.items-line__title').eq(0).text().trim() === titles[i];
                }).eq(0);

                if (found.length) return found;
            }

            // Пока нужный ряд не загрузился — ждём (Lampa подгружает ряды по очереди)
            return $();
        },

        collect: function (line) {
            var items = [];

            var minYear = new Date().getFullYear() - 1;
            var all = [];

            line.find('.card').each(function () {
                var d = this.card_data;
                if (d && d.poster_path && !all.find(function (i) { return i.id === d.id; })) all.push(d);
            });

            // Только свежие релизы; если таких мало — берём ряд как есть
            var fresh = all.filter(function (d) { return parseInt(cardYear(d), 10) >= minYear; });

            items = (fresh.length >= 3 ? fresh : all).slice(0, 8);

            return items;
        },

        build: function (body, line) {
            var self = this;
            var items = this.collect(line);

            if (!items.length) return;

            var hero = $('<div class="mobui-hero"><div class="mobui-hero__track"></div><div class="mobui-hero__pager"><div class="mobui-hero__dots"></div><div class="mobui-hero__pause">' + icon('pause') + icon('play-16') + '</div></div></div>');
            var track = hero.find('.mobui-hero__track');
            var dots = hero.find('.mobui-hero__dots');

            items.forEach(function (card, i) {
                var slide = $(
                    '<div class="mobui-hero__slide">' +
                        '<div class="mobui-hero__poster">' +
                            '<div class="mobui-hero__shadow"></div>' +
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

                if (!cardQuality(card)) {
                    slide[0].mobui_qkey = Quality.key(card);
                    slide[0].mobui_qapply = function (quality) {
                        var b = slide.find('.mobui-hero__badges');
                        var e = b.find('.mobui-badge--q');
                        if (e.length) e.text(quality);
                        else b.append(badge(quality, 'mobui-badge--big mobui-badge--q'));
                    };
                    Quality.get(card, slide[0].mobui_qapply, true);
                }

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
                hero.addClass('holding');
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

            // Заполнение активной точки идёт столько же, сколько показывается слайд
            var dots = hero.find('.mobui-hero__dot').removeClass('run');
            hero.removeClass('holding');

            if (this.paused) return;

            var active = dots.filter('.active');
            if (active.length) {
                void active[0].offsetWidth;
                active.addClass('run');
            }

            this.timer = setTimeout(function () {
                if (!document.body.contains(hero[0])) return;

                if ($('body').hasClass('mobui-drawer-open') || $('body').hasClass('search--open') || $('body').hasClass('settings--open') || !hero.is(':visible')) {
                    return self.schedule(hero);
                }

                var count = hero.find('.mobui-hero__slide').length;
                var next = ((hero.data('index') || 0) + 1) % count;
                self.go(hero, next);
            }, SLIDE_TIME);
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

            // Lampa на узком экране закрывает настройки быстрым свайпом вниз (там это шторка снизу).
            // У нас панель справа: ловим этот жест (класс animate-down) и не даём закрыть панель
            var settingsEl = document.querySelector('.settings');
            var blockBack = 0;

            if (settingsEl && window.MutationObserver) {
                new MutationObserver(function () {
                    if (settingsEl.classList.contains('animate-down')) {
                        settingsEl.classList.remove('animate-down');
                        blockBack = Date.now() + 500;
                    }
                }).observe(settingsEl, { attributes: true, attributeFilter: ['class'] });

                var back = Lampa.Controller.back;
                Lampa.Controller.back = function () {
                    if (Date.now() < blockBack && document.body.classList.contains('settings--open')) {
                        blockBack = 0;
                        return;
                    }
                    return back.apply(this, arguments);
                };
            }

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

            Lampa.SettingsApi.addParam({
                component: 'mobui',
                param: { name: 'mobui_alloha_token', type: 'input', values: '', default: '', placeholder: 'token' },
                field: { name: t('alloha'), description: t('alloha_descr') },
                onChange: function () { Quality.reset(); }
            });

            Lampa.SettingsApi.addParam({
                component: 'mobui',
                param: { name: 'mobui_quality', type: 'trigger', default: true },
                field: { name: t('quality'), description: t('quality_descr') }
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

    /* ------------------------------------------------------------------ */
    /* «Картинка в картинке» в плеере Lampa на iPhone                      */
    /* ------------------------------------------------------------------ */

    // Lampa прячет кнопку PiP, когда открыта с экрана «Домой» на iOS.
    // Показываем её и, если стандартного API нет, включаем PiP через WebKit
    var Pip = {
        bound: false,

        video: function () {
            return document.querySelector('.player video');
        },

        enable: function () {
            var btn = document.querySelector('.player-panel__pip');
            if (!btn) return;

            btn.classList.remove('hide');

            if (this.bound) return;
            this.bound = true;

            var self = this;
            var handler = function (e) {
                var v = self.video();
                if (!v) return;

                v.setAttribute('playsinline', '');
                v.setAttribute('webkit-playsinline', '');

                // Стандартный API есть — дальше справится сама Lampa
                if (document.pictureInPictureEnabled && v.requestPictureInPicture) return;

                if (v.webkitSupportsPresentationMode && v.webkitSupportsPresentationMode('picture-in-picture')) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                    v.webkitSetPresentationMode(v.webkitPresentationMode === 'picture-in-picture' ? 'inline' : 'picture-in-picture');
                }
            };

            btn.addEventListener('hover:enter', handler, true);
            btn.addEventListener('click', handler, true);
        }
    };

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

        Continue.register();

        StatusBar.init();

        // Встроенный плеер Lampa: наши шапка и табы над ним не нужны
        try {
            var syncPlayer = function () {
                var open = false;
                try { open = Lampa.Player.opened(); } catch (e) { }
                document.body.classList.toggle('mobui-player-open', !!open);
            };
            Lampa.Player.listener.follow('start', function () { document.body.classList.add('mobui-player-open'); Pip.enable(); });
            Lampa.Player.listener.follow('ready', function () { document.body.classList.add('mobui-player-open'); Pip.enable(); });
            Lampa.Player.listener.follow('destroy', function () { setTimeout(syncPlayer, 0); });
        } catch (e) { }

        var parts = [Bg, Header, Notify, TabBar, Drawer, Quality, Cards, Hero, Settings, Search];

        parts.forEach(function (part) {
            try { part.init(); }
            catch (e) { console.error('MobUI', 'init error', e); }
        });

        console.log('MobUI', 'started', VERSION);
    }

    function boot() {
        if (!window.Lampa || !Lampa.Listener) return setTimeout(boot, 200);

        try { if (isMobile()) Continue.register(); } catch (e) { }

        if (window.appready) start();
        else {
            Lampa.Listener.follow('app', function (e) {
                if (e.type === 'ready') start();
            });
        }
    }

    boot();
})();
