/*!
 * Fluidity — мобильный интерфейс для Lampa по макетам из Figma (файл «lampac»).
 * https://github.com/werpenart/Lampa-Mob-UI-
 */
(function () {
    'use strict';

    if (window.mobui_plugin_loaded) return;
    window.mobui_plugin_loaded = true;

    var VERSION = '0.1.61';
    var ICONS = /*@ICONS@*/{};
    var CSS = /*@CSS@*/'';

    /* ------------------------------------------------------------------ */
    /* Утилиты                                                             */
    /* ------------------------------------------------------------------ */

    var I18N = {
        ru: { movie: 'Фильм', series: 'Сериал', watch: 'Смотреть', more: 'Ещё', edit_menu: 'Редактировать меню', reset: 'Сбросить', done: 'Готово', notifications: 'Уведомления', search_placeholder: 'Фильмы, сериалы, люди', profile: 'Профиль', profile_name: 'Имя в меню', profile_name_descr: 'Отображается в шапке бокового меню', translucent: 'Прозрачный статус-бар (эксперимент)', translucent_descr: 'В приложении с экрана «Домой» работает нестабильно. Применяется после перезапуска', diag: 'Диагностика экрана', diag_descr: 'Показывает размеры окна. Тап по блоку — обновить', fill: 'Тест: сплошной фон', fill_descr: 'Заливает фон ярким цветом. Если затемнение сверху остаётся — его рисует iOS', clear: 'Тест: прозрачный фон страницы', clear_descr: 'Убирает цвет фона страницы, из которого iOS рисует затемнение сверху', quality: 'Качество на постерах', quality_descr: 'Alloha, затем торренты (JacRed)', alloha: 'Токен Alloha', alloha_descr: 'Для качества на постерах. Без токена — JacRed', feed_movie: 'Вышел в качестве', feed_series: 'Новый сериал в качестве', feed_episode: 'Новая серия', feed_episodes: 'Новые серии', feed_many: 'Новых уведомлений', feed_empty: 'Пока ничего нового', feed_continue: 'Продолжить', role_actor: 'Актёр', role_actress: 'Актриса', role_director: 'Режиссёр', role_producer: 'Продюсер', role_writer: 'Сценарист' },
        uk: { movie: 'Фільм', series: 'Серіал', watch: 'Дивитися', more: 'Ще', edit_menu: 'Редагувати меню', reset: 'Скинути', done: 'Готово', notifications: 'Сповіщення', search_placeholder: 'Фільми, серіали, люди', profile: 'Профіль', profile_name: "Ім'я в меню", profile_name_descr: 'Відображається у шапці бічного меню', translucent: 'Прозорий статус-бар (експеримент)', translucent_descr: 'У застосунку з екрана «Додому» працює нестабільно. Діє після перезапуску', diag: 'Діагностика екрана', diag_descr: 'Показує розміри вікна. Тап по блоку — оновити', fill: 'Тест: суцільний фон', fill_descr: 'Заливає фон яскравим кольором. Якщо затемнення зверху лишається — його малює iOS', clear: 'Тест: прозорий фон сторінки', clear_descr: 'Прибирає колір фону сторінки, з якого iOS малює затемнення зверху', quality: 'Якість на постерах', quality_descr: 'Alloha, потім торренти (JacRed)', alloha: 'Токен Alloha', alloha_descr: 'Для якості на постерах. Без токена — JacRed', feed_movie: 'Вийшов у якості', feed_series: 'Новий серіал у якості', feed_episode: 'Нова серія', feed_episodes: 'Нові серії', feed_many: 'Нових сповіщень', feed_empty: 'Поки нічого нового', feed_continue: 'Продовжити', role_actor: 'Актор', role_actress: 'Акторка', role_director: 'Режисер', role_producer: 'Продюсер', role_writer: 'Сценарист' },
        en: { movie: 'Movie', series: 'Series', watch: 'Watch', more: 'More', edit_menu: 'Edit Menu', reset: 'Reset', done: 'Done', notifications: 'Notifications', search_placeholder: 'Movies, series, people', profile: 'Profile', profile_name: 'Menu name', profile_name_descr: 'Shown at the top of the side menu', translucent: 'Transparent status bar (experimental)', translucent_descr: 'Unstable in the Home Screen app. Applies after restart', diag: 'Screen diagnostics', diag_descr: 'Shows window sizes. Tap the box to refresh', fill: 'Test: solid background', fill_descr: 'Fills the background with a bright color. If the top shade stays, iOS draws it', clear: 'Test: transparent page background', clear_descr: 'Removes the page background color iOS uses for the top shade', quality: 'Quality on posters', quality_descr: 'Alloha, then torrents (JacRed)', alloha: 'Alloha token', alloha_descr: 'For poster quality. Without it — JacRed', feed_movie: 'Out in', feed_series: 'New series in', feed_episode: 'New episode', feed_episodes: 'New episodes', feed_many: 'New notifications', feed_empty: 'Nothing new yet', feed_continue: 'Continue', role_actor: 'Actor', role_actress: 'Actress', role_director: 'Director', role_producer: 'Producer', role_writer: 'Writer' }
    };

    function lang() {
        var l = Lampa.Storage.get('language', 'ru');
        return I18N[l] ? l : (l === 'be' ? 'ru' : 'en');
    }

    function t(key) {
        return I18N[lang()][key] || I18N.en[key] || I18N.ru[key] || key;
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

    // Последняя серия, на которой остановились. Lampa.Timeline.watched смотрит только
    // первый сезон, поэтому: 1) берём то, что запомнил онлайн-плагин (сезон и серия);
    // 2) иначе ищем самую позднюю серию с прогрессом по всем сезонам
    function lastEpisode(card) {
        var name = card.original_name || card.original_title || card.name;
        if (!name) return null;

        try {
            var saved = (Lampa.Storage.get('online_watched_last', '{}') || {})[Lampa.Utils.hash(name)];
            if (saved && saved.season && saved.episode) {
                var t = Lampa.Timeline.watchedEpisode(card, saved.season, saved.episode, true) || {};
                return { season: saved.season, episode: saved.episode, percent: t.percent || 0 };
            }
        } catch (e) { }

        var best = null;
        try {
            var seasons = Math.min(card.number_of_seasons || 15, 40);
            for (var s = 1; s <= seasons; s++) {
                for (var e = 1; e <= 40; e++) {
                    var v = Lampa.Timeline.watchedEpisode(card, s, e, true);
                    if (v && v.percent) best = { season: s, episode: e, percent: v.percent };
                }
            }
        } catch (err) { }

        return best;
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

    // Размытый фон рисуем через маленький canvas, а не CSS blur: в iOS размытие
    // обрезается по краю окна и края уходят в тень — сверху это выглядело как
    // тёмный градиент под статус-баром. Уменьшенная картинка, растянутая обратно,
    // даёт то же размытие, но цвет доходит до самого края
    var Bg = {
        el: null,
        src: '',
        image: null,
        init: function () {
            var self = this;
            // Два слоя: новый меш рисуется в скрытом и плавно проявляется поверх старого
            this.el = $('<div class="mobui-bg"><canvas class="mobui-bg__img"></canvas><canvas class="mobui-bg__img"></canvas><div class="mobui-bg__overlay"></div></div>');
            $('body').prepend(this.el);

            // Фон принадлежит открытой странице: на главной — текущий слайд,
            // на странице фильма/сериала — его собственный постер
            Lampa.Listener.follow('activity', function (e) {
                if (e.type !== 'start') return;
                if (e.component === 'main') self.fromHero();
                else if (e.component === 'full') self.fromCard(e.object && e.object.card);
            });

            Lampa.Listener.follow('full', function (e) {
                if (e.type !== 'complite' || !e.data || !e.data.movie) return;
                var act = Lampa.Activity.active();
                if (act && act.component === 'full') self.fromCard(e.data.movie);
            });

            var timer;
            window.addEventListener('resize', function () {
                clearTimeout(timer);
                timer = setTimeout(function () { self.draw(); }, 200);
            });
        },
        fromHero: function () {
            var src = $('.mobui-hero').filter(function () { return $(this).data('bg'); }).last().data('bg');
            if (src) this.set(src);
        },

        fromCard: function (card) {
            if (!card) return;
            var path = card.poster_path || card.backdrop_path;
            if (path) this.set(tmdbImg(path, 'w500'));
        },

        set: function (src) {
            if (!src || src === this.src) return;
            this.src = src;
            var self = this;
            var load = function (cors) {
                var img = new Image();
                if (cors) img.crossOrigin = 'anonymous';
                img.onload = function () {
                    if (self.src !== src) return;
                    self.image = img;
                    self.draw();
                };
                // Сервер картинок без CORS — грузим как обычно, только без подбора цвета
                img.onerror = function () { if (cors && self.src === src) load(false); };
                img.src = src;
            };
            load(true);
        },
        // Фон как в макете: первый экран — меш-градиент из трёх цветов картинки,
        // ниже — один цвет по картинке. Поверх — тёмный слой 64%.
        // Меш едет вверх вместе с прокруткой страницы
        draw: function () {
            var img = this.image;
            if (!img || !this.el) return;

            var layers = this.el.find('.mobui-bg__img');
            var canvas = layers.filter(':not(.ready)')[0] || layers[0];
            var old = layers.not(canvas);
            var w = window.innerWidth;
            var h = window.innerHeight;
            var pal = this.palette(img);

            canvas.width = Math.round(w / 2);
            canvas.height = Math.round(h / 2);
            var c = canvas.getContext('2d');
            var W = canvas.width, H = canvas.height;

            if (pal) {
                var rgb = function (col, a) { return 'rgba(' + col[0] + ',' + col[1] + ',' + col[2] + ',' + a + ')'; };
                var spot = function (x, y, r, col) {
                    var g = c.createRadialGradient(x, y, 0, x, y, r);
                    g.addColorStop(0, rgb(col, 1));
                    g.addColorStop(0.45, rgb(col, 0.55));
                    g.addColorStop(1, rgb(col, 0));
                    c.fillStyle = g;
                    c.fillRect(0, 0, W, H);
                };

                c.fillStyle = rgb(pal.base, 1);
                c.fillRect(0, 0, W, H);
                // Три точки: слева, сверху по центру (самый яркий цвет), справа
                spot(0, H * 0.18, W * 0.95, pal.left);
                spot(W * 1, H * 0.06, W * 0.8, pal.right);
                spot(W * 0.5, 0, W * 0.9, pal.accent);

                // Ниже первого экрана — ровно цвет основы
                var fade = c.createLinearGradient(0, H * 0.3, 0, H * 0.62);
                fade.addColorStop(0, rgb(pal.base, 0));
                fade.addColorStop(1, rgb(pal.base, 1));
                c.fillStyle = fade;
                c.fillRect(0, 0, W, H);

                this.el.css('background-color', rgb(pal.base, 1));
            }
            else {
                // Картинку не дали прочитать (нет CORS) — размытая картинка, как раньше
                var iw = img.naturalWidth, ih = img.naturalHeight;
                if (!iw || !ih) return;
                var small = document.createElement('canvas');
                small.width = Math.max(4, Math.round(w / 32));
                small.height = Math.max(4, Math.round(h / 32));
                var scale = Math.max(w / iw, h / ih);
                var sw = w / scale, sh = h / scale;
                try {
                    small.getContext('2d').drawImage(img, (iw - sw) / 2, 0, sw, sh, 0, 0, small.width, small.height);
                    c.imageSmoothingEnabled = true;
                    c.drawImage(small, 0, 0, W, H);
                } catch (e) { }
            }

            old.removeClass('ready');
            $(canvas).addClass('ready');
            this.scrollFollow();

            var base = pal ? pal.base : null;
            var top = pal ? this.mix(pal.accent, pal.base, 0.5) : null;
            this.tint(top || base);
        },

        mix: function (a, b, k) {
            return [0, 1, 2].map(function (i) { return Math.round(a[i] * k + b[i] * (1 - k)); });
        },

        // Цвета картинки: средние по левой и правой части верха, самый насыщенный
        // и общий цвет основы (затемнённый средний)
        palette: function (img) {
            try {
                var cv = document.createElement('canvas');
                cv.width = 24; cv.height = 36;
                var cx = cv.getContext('2d');
                cx.drawImage(img, 0, 0, 24, 36);
                var d = cx.getImageData(0, 0, 24, 36).data;

                var avg = function (x0, x1, y0, y1) {
                    var r = 0, g = 0, b = 0, n = 0;
                    for (var y = y0; y < y1; y++) for (var x = x0; x < x1; x++) {
                        var i = (y * 24 + x) * 4;
                        r += d[i]; g += d[i + 1]; b += d[i + 2]; n++;
                    }
                    return [r / n, g / n, b / n];
                };

                var best = null, bestScore = -1;
                for (var i = 0; i < d.length; i += 4) {
                    var mx = Math.max(d[i], d[i + 1], d[i + 2]), mn = Math.min(d[i], d[i + 1], d[i + 2]);
                    var sat = mx ? (mx - mn) / mx : 0;
                    var score = sat * mx * (mx > 40 ? 1 : 0.2);
                    if (score > bestScore) { bestScore = score; best = [d[i], d[i + 1], d[i + 2]]; }
                }

                var all = avg(0, 24, 0, 36);
                var round = function (col, k) { return col.map(function (v) { return Math.round(v * k); }); };

                return {
                    left: round(avg(0, 10, 0, 18), 1),
                    right: round(avg(14, 24, 0, 18), 0.55),
                    accent: round(best || all, 1),
                    base: round(this.mix(all, best || all, 0.7), 0.42)
                };
            } catch (e) { return null; }
        },

        // Меш занимает первый экран и уезжает вместе со страницей
        scrollFollow: function () {
            var self = this;
            if (this.following) return;
            this.following = true;

            var canvas = this.el.find('.mobui-bg__img');
            var raf = 0;
            var update = function () {
                raf = 0;
                var act = Lampa.Activity.active();
                var top = 0;
                try {
                    var box = act && act.activity && $(act.activity.render()).find('.scroll--over, .scroll').first()[0];
                    if (box) top = box.scrollTop || 0;
                    if (!top && box) {
                        var content = box.querySelector('.scroll__content, .scroll__body');
                        var m = content && /translate3?d?\(\s*[-\d.]+px\s*,\s*(-?[\d.]+)px/.exec(content.style.transform || '');
                        if (m) top = -parseFloat(m[1]);
                    }
                } catch (e) { }
                canvas.css('transform', 'translate3d(0,' + (-Math.max(0, top)) + 'px,0)');
            };

            document.addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(update); }, { capture: true, passive: true });
            Lampa.Listener.follow('activity', function (e) { if (e.type === 'start') setTimeout(update, 50); });
            setInterval(function () { if (!raf) raf = requestAnimationFrame(update); }, 500);
        },

        // iOS рисует под статус-баром градиент цветом фона страницы (html/body), поверх
        // шапки. Красим фон страницы в цвет верха фона (с учётом затемнения 64%)
        tint: function (col) {
            var color = StatusBar.color;
            if (col) color = 'rgb(' + Math.round(col[0] * 0.36) + ',' + Math.round(col[1] * 0.36) + ',' + Math.round(col[2] * 0.36) + ')';
            this.color = color;
            this.paint();
        },

        paint: function () {
            if (!this.color) return;
            [document.documentElement, document.body].forEach(function (el) {
                if (el) el.style.setProperty('background-color', Bg.color, 'important');
            });

            // Непрозрачный статус-бар iOS красит цветом theme-color — ставим тот же цвет,
            // что у фона под шапкой, чтобы статус-бар и шапка были одной полосой
            if (StatusBar.lockTheme) StatusBar.lockTheme();
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
            try { count = Feed.unread(); } catch (e) { }
            var bell = this.el.find('.mobui-head__bell').toggleClass('has-new', count > 0);

            // Вырез под точку: iOS не перерисовывает маску, если просто спрятать круг в ней,
            // и колокольчик оставался «надкушенным». Поэтому маску снимаем с иконки целиком
            var g = bell.find('[mask], [data-mask]');
            g.each(function () {
                if (!this.getAttribute('data-mask')) this.setAttribute('data-mask', this.getAttribute('mask'));
                if (count > 0) this.setAttribute('mask', this.getAttribute('data-mask'));
                else this.removeAttribute('mask');
            });
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

                // Запоминаем пункт: следующая открытая страница будет «его»
                if (action) {
                    self.pending = action;
                    clearTimeout(self.pendingTimer);
                    self.pendingTimer = setTimeout(function () { self.pending = ''; }, 3000);
                }

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

            // Страница, открытая из меню, помнит свой пункт — и при возврате «назад» тоже
            Lampa.Listener.follow('activity', function (e) {
                if (e.type !== 'start' || !e.object) return;
                if (self.pending && !e.object.mobuiMenu) {
                    e.object.mobuiMenu = self.pending;
                    self.pending = '';
                }
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

            // Активен только пункт текущего раздела. На странице фильма, в поиске и т. п.
            // не подсвечиваем ничего
            var cur = TabBar.current ? TabBar.current() : '';
            var act = Lampa.Activity.active();
            var active = '';
            if (cur !== 'search' && cur !== 'settings' && act && act.mobuiMenu) active = act.mobuiMenu;
            else if (cur === 'main' || cur === 'favorite') active = cur;

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
                    var last = lastEpisode(data);
                    if (last) {
                        percent = last.percent || 0;
                        episode = metaLine(['S' + last.season, 'E' + last.episode]);
                    }
                }
                else if (tl) {
                    percent = tl.percent || 0;

                    // Где остановился и сколько идёт фильм: 00:30:00 • 01:45:00
                    if (tl.time > 0) times = esc(hms(tl.time));
                }
            } catch (e) { }

            // Прогресс — только у фильмов: у сериалов вместо него сезон и серия
            if (percent && !isSeries(data)) {
                view.addClass('mobui-has-progress');
                view.append('<div class="mobui-card mobui-progress"><div style="width:' + Math.min(100, percent) + '%"></div></div>');
            }

            // На обложке справа, в ряд с рейтингом: глазик + где остановился (фильм) или сезон/серия
            var watch = isSeries(data) ? episode : times;
            if (watch) {
                view.append('<div class="mobui-card mobui-wide-watch' + (isSeries(data) ? ' mobui-wide-watch--series' : '') + '">' + icon('episode') + '<div class="mobui-wide-watch__text">' + watch + '</div></div>');
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
                if (e.component === 'main' && e.type === 'start' && self.stale) self.rebuild(e.object);
                if (e.component === 'main' && (e.type === 'start' || e.type === 'create')) self.wait(e.object);
                if (e.component === 'main' && e.type === 'start') self.resume();
            });

            var act = Lampa.Activity.active();
            if (act && act.component === 'main') this.wait(act);

            this.loadSeries();
            this.loadMovies();

            // Приложение на iPhone может висеть открытым днями: раз в 3 часа обновляем
            // список, а слайдер пересобираем при следующем заходе на главную
            setInterval(function () {
                var was = self.signature();
                self.loadMovies();
                self.loadSeries();
                setTimeout(function () { if (self.signature() !== was) self.stale = true; }, 15000);
            }, 3 * 3600 * 1000);
        },

        stale: false,

        signature: function () {
            return this.movies.concat(this.series).map(function (c) { return c.id; }).join(',');
        },

        rebuild: function (object) {
            this.stale = false;
            if (!object || !object.activity) return;
            $(object.activity.render()).find('.mobui-hero').remove();
        },

        movies: [],
        moviesDone: false,

        // Фильмы для слайдера берём прямо из TMDB («Сегодня в тренде»), а не из ряда на
        // странице: Lampa рисует в ряду только первые несколько карточек, и слайдер
        // получал 3 фильма. Старые фильмы из тренда не берём
        loadMovies: function () {
            var self = this;
            var minYear = new Date().getFullYear() - 1;
            try {
                Lampa.Api.sources.tmdb.get('trending/movie/day', {}, function (json) {
                    self.movies = (json.results || []).filter(function (c) {
                        return c.poster_path && c.backdrop_path && parseInt(cardYear(c), 10) >= minYear;
                    }).slice(0, 6).map(function (c) {
                        c.source = 'tmdb';
                        return c;
                    });
                    self.moviesDone = true;
                }, function () { self.moviesDone = true; });
            } catch (e) { this.moviesDone = true; }
        },

        series: [],
        seriesDone: false,

        // Новые сериалы для слайдера: вышли за последние ~4 месяца, по популярности.
        // Новости, реалити и ток-шоу не берём
        loadSeries: function () {
            var self = this;
            var d = new Date();
            var to = d.toISOString().slice(0, 10);
            d.setDate(d.getDate() - 120);
            var from = d.toISOString().slice(0, 10);

            var method = 'discover/tv?sort_by=popularity.desc&first_air_date.gte=' + from +
                '&first_air_date.lte=' + to + '&vote_count.gte=20&without_genres=10763,10764,10767';

            try {
                Lampa.Api.sources.tmdb.get(method, {}, function (json) {
                    self.series = (json.results || []).filter(function (c) {
                        return c.poster_path && c.backdrop_path;
                    }).slice(0, 4).map(function (c) {
                        c.source = 'tmdb';
                        return c;
                    });
                    self.seriesDone = true;
                }, function () { self.seriesDone = true; });
            } catch (e) { this.seriesDone = true; }
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

                // Ждём новые сериалы (до ~2,5 с), чтобы слайдер не пересобирался потом
                var ready = (self.seriesDone && self.moviesDone) || tries > 50;

                if (ready && body.length && line.length && line.find('.card').length >= 3) {
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

            var movies = this.movies.length >= 3 ? this.movies : (fresh.length >= 3 ? fresh : all);

            // Чередуем: фильм, фильм, сериал… — всего до 8 слайдов
            var series = this.series.filter(function (c) {
                return !movies.find(function (m) { return m.id === c.id; });
            });
            var m = 0, t = 0;
            while (items.length < 8 && (m < movies.length || t < series.length)) {
                if (m < movies.length) items.push(movies[m++]);
                if (items.length < 8 && m < movies.length) items.push(movies[m++]);
                if (items.length < 8 && t < series.length) items.push(series[t++]);
            }

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
            hero.data('bg', card ? tmdbImg(card.poster_path, 'w500') : '');

            // Фон за слайдером меняем только на главной: на странице фильма и в других
            // разделах слайдер продолжает жить в фоне, но фон страницы не трогает
            var act = Lampa.Activity.active();
            if (card && act && act.component === 'main') Bg.set(hero.data('bg'));
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
                name: 'Fluidity',
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
                param: { name: 'mobui_translucent', type: 'trigger', default: false },
                field: { name: t('translucent'), description: t('translucent_descr') }
            });

            Lampa.SettingsApi.addParam({
                component: 'mobui',
                param: { name: 'mobui_diag', type: 'trigger', default: false },
                field: { name: t('diag'), description: t('diag_descr') },
                onChange: function (v) { Diag.toggle(v === true || v === 'true'); }
            });

            Lampa.SettingsApi.addParam({
                component: 'mobui',
                param: { name: 'mobui_testfill', type: 'trigger', default: false },
                field: { name: t('fill'), description: t('fill_descr') },
                onChange: function (v) { TestFill.toggle(v === true || v === 'true'); }
            });

            Lampa.SettingsApi.addParam({
                component: 'mobui',
                param: { name: 'mobui_testclear', type: 'trigger', default: false },
                field: { name: t('clear'), description: t('clear_descr') },
                onChange: function (v) { TestFill.clear(v === true || v === 'true'); }
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

            // «Fluidity» — последним в основном блоке
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

    // Ряд актёра на главной: вместо заголовка с именем — плашка из макета
    // (фото, имя, роли, шеврон). Нажатие открывает страницу актёра
    var PersonRow = {
        cache: {},

        init: function () {
            var self = this;
            Lampa.Listener.follow('line', function (e) {
                if (e.type !== 'create' || !e.data || !e.line) return;
                if (!e.data.icon_img || e.data.icon_svg) return;
                if (String(e.data.icon_img).indexOf('w90_and_h90_face') < 0) return;
                self.build(e.line, e.data);
            });
        },

        build: function (line, data) {
            var self = this;
            var html = line.html || (line.render && line.render());
            var head = $(html).find('.items-line__head').eq(0);
            if (!head.length) return;

            var photo = String(data.icon_img).replace('w90_and_h90_face', 'w185');
            var el = $(
                '<div class="mobui-person selector">' +
                    '<div class="mobui-person__photo"><img alt=""></div>' +
                    '<div class="mobui-person__body">' +
                        '<div class="mobui-person__name"></div>' +
                        '<div class="mobui-person__roles mobui-meta"></div>' +
                    '</div>' +
                    '<div class="mobui-person__go">' + icon('chevron-right') + '</div>' +
                '</div>'
            );
            el.find('.mobui-person__name').text(data.title || '');
            el.find('img').attr('src', photo).on('error', function () { this.src = data.icon_img; });

            head.addClass('mobui-person-head').empty().append(el);

            this.info(data.title, function (info) {
                if (!info) return;
                el.data('id', info.id);
                el.find('.mobui-person__roles').html(metaLine(info.roles));
            });

            onTap(el, function () {
                var id = el.data('id');
                if (!id) return;
                Lampa.Activity.push({ url: '', title: data.title, component: 'actor', id: id, source: 'tmdb' });
            });
        },

        // Роли: основная профессия (с учётом пола) и ещё до двух из работ за кадром
        info: function (name, done) {
            if (!name) return done(null);
            if (this.cache[name]) return done(this.cache[name]);

            var self = this;
            var tmdb = Lampa.Api.sources.tmdb;

            tmdb.get('search/person?query=' + encodeURIComponent(name), {}, function (json) {
                var p = (json.results || []).filter(function (r) { return r.name === name; })[0] || (json.results || [])[0];
                if (!p) return done(null);

                var role = function (dep) {
                    if (dep === 'Acting') return t(p.gender === 1 ? 'role_actress' : 'role_actor');
                    var map = { Directing: 'role_director', Production: 'role_producer', Writing: 'role_writer' };
                    return map[dep] ? t(map[dep]) : '';
                };

                tmdb.get('person/' + p.id + '/combined_credits', {}, function (cr) {
                    var count = {};
                    (cr.crew || []).forEach(function (c) { if (c.department) count[c.department] = (count[c.department] || 0) + 1; });
                    var deps = Object.keys(count).sort(function (a, b) { return count[b] - count[a]; });

                    var roles = [role(p.known_for_department || 'Acting')];
                    deps.forEach(function (d) {
                        var r = role(d);
                        if (r && roles.indexOf(r) < 0 && roles.length < 3) roles.push(r);
                    });

                    var info = { id: p.id, roles: roles.filter(Boolean) };
                    self.cache[name] = info;
                    done(info);
                }, function () {
                    var info = { id: p.id, roles: [role(p.known_for_department || 'Acting')].filter(Boolean) };
                    self.cache[name] = info;
                    done(info);
                });
            }, function () { done(null); });
        }
    };

    // Окно выбора Lampa: кнопка закрытия как у шторки уведомлений
    var SelectBox = {
        init: function () {
            var self = this;
            if (!window.MutationObserver) return;
            new MutationObserver(function () {
                if (document.body.classList.contains('selectbox--open')) self.decorate();
            }).observe(document.body, { attributes: true, attributeFilter: ['class'] });
        },

        decorate: function () {
            var self = this;
            var box = $('.selectbox').eq(0);

            // Пункты и замки могут дорисовываться уже после открытия
            if (box.length && !this.watch) {
                this.watch = new MutationObserver(function () {
                    if (document.body.classList.contains('selectbox--open')) self.decorate();
                });
                this.watch.observe(box[0], { childList: true, subtree: true });
            }

            var head = box.find('.selectbox__head');
            if (head.length && !head.find('.mobui-sheet__close').length) {
                var btn = $('<div class="mobui-sheet__close">' + icon('close') + '</div>');
                head.append(btn);
                onTap(btn, function () { try { Lampa.Select.close(); } catch (e) { } });
            }

            // Флажки — как в редакторе меню, замок — из Lucide
            box.find('.selectbox-item__checkbox').each(function () {
                if (!this.querySelector('svg')) this.innerHTML = icon('checkbox-on') + icon('checkbox-off');
            });
            box.find('.selectbox-item__lock').each(function () {
                if (!this.getAttribute('data-mobui')) {
                    this.setAttribute('data-mobui', '1');
                    this.innerHTML = icon('lock');
                }
            });
        }
    };

    // Долгое нажатие на карточку: пока палец держит её, карточка чуть увеличивается
    // и отбрасывает тень — видно, что сейчас откроется меню действий
    var CardPress = {
        init: function () {
            var timer, card = null, sx = 0, sy = 0;
            var opt = { capture: true, passive: true };

            var release = function () {
                clearTimeout(timer);
                if (card) card.classList.remove('mobui-press');
                card = null;
            };

            document.addEventListener('touchstart', function (e) {
                release();
                var t = e.target && e.target.closest && e.target.closest('.card');
                var p = e.touches && e.touches[0];
                if (!t || !p) return;
                sx = p.clientX; sy = p.clientY;
                timer = setTimeout(function () { card = t; t.classList.add('mobui-press'); }, 200);
            }, opt);

            document.addEventListener('touchmove', function (e) {
                var p = e.touches && e.touches[0];
                if (p && (Math.abs(p.clientX - sx) > 10 || Math.abs(p.clientY - sy) > 10)) release();
            }, opt);

            document.addEventListener('touchend', release, opt);
            document.addEventListener('touchcancel', release, opt);
        }
    };

    // Защита от ложных нажатий при прокрутке. iOS отдаёт click, если палец почти
    // не сдвинулся, а также когда касанием останавливают инерцию прокрутки — и карточка
    // открывается сама. Гасим такой click до того, как его увидит Lampa:
    //  - палец за касание сдвинулся больше чем на 10px;
    //  - касание пришлось на прокрутку, которая ещё идёт (инерция), или сразу после свайпа
    var TapGuard = {
        init: function () {
            var sx = 0, sy = 0, moved = false, block = false;
            var lastScroll = 0, lastSwipe = 0, touchEnd = 0;
            var opt = { capture: true, passive: true };

            document.addEventListener('scroll', function () { lastScroll = Date.now(); }, opt);

            document.addEventListener('touchstart', function (e) {
                var p = e.touches && e.touches[0];
                if (!p) return;
                var now = Date.now();
                sx = p.clientX; sy = p.clientY; moved = false;
                block = now - lastScroll < 120 || now - lastSwipe < 300;
            }, opt);

            document.addEventListener('touchmove', function (e) {
                var p = e.touches && e.touches[0];
                if (!p || moved) return;
                if (Math.abs(p.clientX - sx) > 10 || Math.abs(p.clientY - sy) > 10) moved = true;
            }, opt);

            document.addEventListener('touchend', function () {
                touchEnd = Date.now();
                if (moved) { block = true; lastSwipe = touchEnd; }
            }, opt);

            window.addEventListener('click', function (e) {
                if (!block || Date.now() - touchEnd > 700) return;
                // Поля ввода не трогаем: им нужен фокус
                if (e.target && e.target.closest && e.target.closest('input, textarea')) return;
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
            }, true);
        }
    };

    /* ------------------------------------------------------------------ */
    /* Лента уведомлений (вместо уведомлений CUB)                          */
    /* ------------------------------------------------------------------ */

    // Три вида событий:
    //  1) фильм вышел в качестве (новинки проката и фильмы из закладок);
    //  2) новый сериал вышел в качестве, если его ещё не смотрели;
    //  3) у сериала из истории вышли новые серии после той, на которой остановились.
    // Качество — из того же модуля, что и бейджи на постерах (Alloha + JacRed).
    // Логика новых серий взята из плагина new_episodes (uahorizon26/series)
    var Feed = {
        KEY: 'mobui_feed_v3',
        INFO_KEY: 'mobui_feed_tv',
        TTL: 30 * 60 * 1000,
        GOOD: ['HD', 'FHD', '4K'],
        data: null,
        tvinfo: null,
        busy: false,
        first: true,

        load: function () {
            if (this.data) return;
            try { this.data = JSON.parse(localStorage.getItem(this.KEY) || 'null'); } catch (e) { }
            if (!this.data || !this.data.items) this.data = { items: {}, seen: {}, known: {}, base: false };
            if (!this.data.known) this.data.known = {};
            try { localStorage.removeItem('mobui_feed'); localStorage.removeItem('mobui_feed_v2'); } catch (e) { }
            try { this.tvinfo = JSON.parse(localStorage.getItem(this.INFO_KEY) || '{}') || {}; } catch (e) { this.tvinfo = {}; }
        },

        save: function () {
            var items = this.data.items;
            var keys = Object.keys(items);
            if (keys.length > 60) {
                keys.sort(function (a, b) { return items[b].time - items[a].time; });
                keys.slice(60).forEach(function (k) { delete items[k]; });
            }
            var known = this.data.known, old = Date.now() - 90 * 24 * 3600 * 1000;
            Object.keys(known).forEach(function (k) { if (known[k] < old) delete known[k]; });
            try { localStorage.setItem(this.KEY, JSON.stringify(this.data)); } catch (e) { }
            try { localStorage.setItem(this.INFO_KEY, JSON.stringify(this.tvinfo)); } catch (e) { }
        },

        init: function () {
            var self = this;
            this.load();

            setTimeout(function () { self.refresh(); }, 4000);
            setInterval(function () { self.refresh(); }, 15 * 60 * 1000);

            // После просмотра серии/фильма пересчитываем (просмотренное уходит из ленты)
            try { Lampa.Player.listener.follow('destroy', function () { setTimeout(function () { self.prune(); }, 800); }); } catch (e) { }
        },

        // Карточка без лишнего: хранится в localStorage
        slim: function (c) {
            return {
                id: c.id, title: c.title, name: c.name, original_title: c.original_title, original_name: c.original_name,
                poster_path: c.poster_path, backdrop_path: c.backdrop_path, vote_average: c.vote_average,
                release_date: c.release_date, first_air_date: c.first_air_date, genre_ids: c.genre_ids,
                number_of_seasons: c.number_of_seasons, overview: c.overview || '', source: 'tmdb'
            };
        },

        history: function () {
            try { return Lampa.Favorite.get({ type: 'history' }) || []; } catch (e) { return []; }
        },

        inHistory: function (card) {
            return this.history().some(function (h) { return h.id === card.id && isSeries(h) === isSeries(card); });
        },

        started: function (card) {
            try { return !!Lampa.Timeline.watched(card); } catch (e) { return false; }
        },

        add: function (key, item) {
            var ex = this.data.items[key];
            if (ex) return false;
            item.time = Date.now();
            this.data.items[key] = item;
            return true;
        },

        // Фильм/сериал в качестве — уведомляем один раз и только о том, что появилось
        // после первой проверки (вышел в качестве позже или новинка добавилась в список)
        fresh: function (key, item) {
            var known = this.data.known;
            if (known[key]) return;
            known[key] = Date.now();
            if (this.data.base) this.add(key, item);
        },

        unread: function () {
            var self = this;
            this.load();
            return Object.keys(this.data.items).filter(function (k) { return !self.data.seen[k]; }).length;
        },

        list: function () {
            var items = this.data.items;
            // Новее — выше; найденные за одну проверку: новые серии, потом фильмы, потом сериалы
            var rank = { episode: 0, movie: 1, series: 2, continue: 3 };
            return Object.keys(items).map(function (k) { items[k].key = k; return items[k]; })
                .sort(function (a, b) {
                    var d = Math.floor(b.time / 600000) - Math.floor(a.time / 600000);
                    return d || (rank[a.type] - rank[b.type]) || (b.time - a.time);
                });
        },

        markSeen: function () {
            var self = this;
            Object.keys(this.data.items).forEach(function (k) { self.data.seen[k] = 1; });
            // Старые отметки о прочтении, которых уже нет в ленте, не храним
            Object.keys(this.data.seen).forEach(function (k) { if (!self.data.items[k]) delete self.data.seen[k]; });
            this.save();
            Header.updateBell();
        },

        // Убираем то, что уже смотрят
        prune: function () {
            var self = this;
            var items = this.data.items;
            Object.keys(items).forEach(function (k) {
                var it = items[k];
                if (it.type === 'movie' && self.started(it.card)) delete items[k];
                if (it.type === 'series' && self.inHistory(it.card)) delete items[k];
                if (it.type === 'episode' || it.type === 'continue') {
                    var info = self.tvinfo[it.card.id];
                    var r = info ? self.calc(it.card, info) : null;
                    if (!r) delete items[k];
                    else if (it.type === 'continue') { it.next = r.next; it.n = r.n; }
                }
            });
            this.save();
            Header.updateBell();
        },

        refresh: function () {
            if (this.busy) return;
            this.busy = true;

            var self = this;
            var before = this.unread();
            var jobs = 3;
            var done = function () {
                if (--jobs) return;
                self.busy = false;
                // Первая проверка только запоминает, что уже есть в качестве: это не новость
                self.data.base = true;
                self.save();
                self.prune();
                var now = self.unread();
                if (now > before) self.toast(now - before);
                self.first = false;
            };

            this.movies(done);
            this.series(done);
            this.episodes(done);
        },

        tmdb: function (method, ok) {
            try { Lampa.Api.sources.tmdb.get(method, {}, ok, function () { ok({}); }); }
            catch (e) { ok({}); }
        },

        range: function (days) {
            var d = new Date();
            var to = d.toISOString().slice(0, 10);
            d.setDate(d.getDate() - days);
            return { from: d.toISOString().slice(0, 10), to: to };
        },

        // Ждём качество по списку карточек и добавляем те, что вышли в хорошем
        withQuality: function (cards, onGood, done) {
            var self = this;
            var left = cards.length;
            if (!left) return done();

            cards.forEach(function (card) {
                var finished = false;
                var finish = function () { if (finished) return; finished = true; if (--left === 0) done(); };

                Quality.get(card, function (q) {
                    if (self.GOOD.indexOf(q) >= 0) onGood(card, q);
                    finish();
                });

                // Если качество не нашлось, Quality.get колбэк не вызывает — не ждём вечно
                setTimeout(finish, 20000);
            });
        },

        // 1) Фильмы: новинки за ~4 месяца и фильмы из закладок
        movies: function (done) {
            var self = this;
            var r = this.range(120);
            var method = 'discover/movie?sort_by=popularity.desc&primary_release_date.gte=' + r.from +
                '&primary_release_date.lte=' + r.to + '&vote_count.gte=30';

            this.tmdb(method, function (json) {
                var cards = (json.results || []).slice(0, 12);

                try {
                    ['book', 'wath', 'like'].forEach(function (type) {
                        (Lampa.Favorite.get({ type: type }) || []).forEach(function (c) {
                            if (!isSeries(c) && c.id && !cards.some(function (x) { return x.id === c.id; })) cards.push(c);
                        });
                    });
                } catch (e) { }

                cards = cards.filter(function (c) { return c.poster_path && !self.started(c); }).slice(0, 30);

                self.withQuality(cards, function (card, q) {
                    self.fresh('m' + card.id, { type: 'movie', card: self.slim(card), quality: q });
                }, done);
            });
        },

        // 2) Новые сериалы, которые ещё не смотрели
        series: function (done) {
            var self = this;
            var r = this.range(120);
            var method = 'discover/tv?sort_by=popularity.desc&first_air_date.gte=' + r.from +
                '&first_air_date.lte=' + r.to + '&vote_count.gte=20&without_genres=10763,10764,10767';

            this.tmdb(method, function (json) {
                var cards = (json.results || []).filter(function (c) {
                    return c.poster_path && !self.inHistory(c);
                }).slice(0, 12);

                self.withQuality(cards, function (card, q) {
                    self.fresh('s' + card.id, { type: 'series', card: self.slim(card), quality: q });
                }, done);
            });
        },

        // 3) Новые серии у сериалов из истории
        episodes: function (done) {
            var self = this;
            var list = this.history().filter(isSeries).slice(0, 40);
            var need = list.filter(function (c) {
                var i = self.tvinfo[c.id];
                return !i || Date.now() - i.ts > self.TTL;
            });

            var idx = 0, active = 0;

            var finish = function () {
                list.forEach(function (card) {
                    var info = self.tvinfo[card.id];
                    var r = info ? self.calc(card, info) : null;
                    var last = info ? info.last.s + 'x' + info.last.e : '';

                    // Новая серия — только у сериалов, которые ещё выходят, и только если
                    // она вышла после того, как мы начали следить за сериалом
                    var fresh = r && info.ongoing && info.known && info.known !== last;

                    if (fresh) {
                        delete self.data.items['c' + card.id];
                        self.add('e' + card.id + '_' + last, { type: 'episode', card: self.slim(card), ep: last, next: r.next, n: r.n, last: info.lastEp });
                    }
                    // Иначе, если есть непросмотренные вышедшие серии — «Продолжить просмотр».
                    // Одна запись на сериал: серия в ней обновляется, но заново не всплывает
                    else if (r && !self.data.items['e' + card.id + '_' + last]) {
                        var c = self.data.items['c' + card.id];
                        if (c) { c.next = r.next; c.n = r.n; }
                        else self.add('c' + card.id, { type: 'continue', card: self.slim(card), next: r.next, n: r.n });
                    }
                    else if (!r) delete self.data.items['c' + card.id];

                    if (info) info.known = last;
                });
                done();
            };

            var pump = function () {
                if (idx >= need.length && !active) return finish();
                while (active < 3 && idx < need.length) (function (card) {
                    idx++; active++;
                    self.tmdb('tv/' + card.id, function (j) {
                        if (j && j.last_episode_to_air) {
                            var prev = self.tvinfo[card.id] || {};
                            var le = j.last_episode_to_air;
                            self.tvinfo[card.id] = {
                                ts: Date.now(),
                                known: prev.known,
                                ongoing: !!(j.in_production || /returning|production|planned/i.test(j.status || '')),
                                lastEp: { name: le.name || '', overview: le.overview || '' },
                                last: { s: j.last_episode_to_air.season_number, e: j.last_episode_to_air.episode_number },
                                seasons: (j.seasons || []).filter(function (s) { return s.season_number > 0; })
                                    .map(function (s) { return { n: s.season_number, c: s.episode_count || 0 }; })
                            };
                        }
                        else if (self.tvinfo[card.id]) self.tvinfo[card.id].ts = Date.now();
                        active--;
                        pump();
                    });
                })(need[idx]);
            };

            pump();
        },

        seen: function (titles, s, e) {
            for (var i = 0; i < titles.length; i++) {
                var h = Lampa.Utils.hash([s, s > 10 ? ':' : '', e, titles[i]].join(''));
                var v = Lampa.Timeline.view(h);
                if (v && (v.percent > 0 || v.time > 0)) return true;
            }
            return false;
        },

        // Новое = вышло после последней серии, которую начинали смотреть
        calc: function (card, info) {
            var titles = [];
            [card.original_title, card.original_name, card.name, card.title].forEach(function (t) { if (t && titles.indexOf(t) < 0) titles.push(t); });

            var S = info.seasons.slice().sort(function (a, b) { return a.n - b.n; });
            var L = info.last, ws = 0, we = 0, n = 0, next, i, e;

            for (i = S.length - 1; i >= 0 && !ws; i--) {
                var s = S[i];
                if (s.n > L.s) continue;
                var top = s.n === L.s ? L.e : s.c;
                for (e = top; e >= 1; e--) if (this.seen(titles, s.n, e)) { ws = s.n; we = e; break; }
            }

            if (!ws) return null;
            if (ws === L.s && we >= L.e) return null;

            S.forEach(function (s) {
                if (s.n < ws || s.n > L.s) return;
                var from = s.n === ws ? we : 0, to = s.n === L.s ? L.e : s.c;
                if (to > from) n += to - from;
            });
            if (n < 1) return null;

            var cs = 0;
            S.forEach(function (s) { if (s.n === ws) cs = s.c; });
            if (ws === L.s || we < cs) next = { s: ws, e: we + 1 };
            else {
                next = { s: L.s, e: 1 };
                for (i = 0; i < S.length; i++) if (S[i].n > ws) { next = { s: S[i].n, e: 1 }; break; }
            }

            return { n: n, next: next, last: L };
        },

        // Для листа уведомлений: в том же виде, что раньше давали уведомления Lampa
        elements: function () {
            return this.list().map(function (it) {
                var card = $.extend({}, it.card);
                var el = { card: card, time: it.time, title: card.title || card.name || '', labels: [], method: it.type === 'movie' ? 'movie' : 'tv', text: card.overview || '' };

                if (it.type === 'movie' || it.type === 'series') card.quality = it.quality;

                if (it.type === 'episode') {
                    var one = it.n === 1 && it.last && it.last.name;
                    el.labels = ['S' + it.next.s, 'E' + it.next.e + (one ? ' - ' + it.last.name : it.n > 1 ? ' +' + (it.n - 1) : '')];
                    if (it.n === 1 && it.last && it.last.overview) el.text = it.last.overview;
                }

                if (it.type === 'continue') {
                    el.labels = [t('feed_continue'), 'S' + it.next.s, 'E' + it.next.e];
                }

                return el;
            });
        },

        // Плашка над табами, в стиле плагина
        toast: function (count) {
            var busy = false;
            try { busy = Lampa.Player.opened && Lampa.Player.opened(); } catch (e) { }
            if (busy) return;

            var items = this.list().filter(function (it) { return !Feed.data.seen[it.key]; });
            if (!items.length) return;

            var text;
            if (count === 1) {
                var it = items[0];
                var name = it.card.title || it.card.name || '';
                text = (it.type === 'continue' ? t('feed_continue') : it.type === 'episode' ? (it.n > 1 ? t('feed_episodes') : t('feed_episode')) : it.type === 'movie' ? t('feed_movie') + ' ' + it.quality : t('feed_series') + ' ' + it.quality) + ': ' + name;
            }
            else text = t('feed_many') + ': ' + count;

            var el = $('.mobui-toast');
            if (!el.length) {
                el = $('<div class="mobui-toast selector">' + icon('bell') + '<div class="mobui-toast__text"></div></div>');
                $('body').append(el);
                onTap(el, function () { el.removeClass('show'); Notify.open(); });
            }

            el.find('.mobui-toast__text').text(text);
            el.addClass('show');
            clearTimeout(this.toastTimer);
            this.toastTimer = setTimeout(function () { el.removeClass('show'); }, 6000);
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
            return Feed.elements();
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
                list.append($('<div class="mobui-sheet__empty"></div>').text(t('feed_empty')));
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

                // Качество, если его нет в записи (сериал в «Продолжить» и т. п.) — подтягиваем
                if (card && !cardQuality(card)) {
                    Quality.get(card, function (q) {
                        var box = item.find('.mobui-notice__badges');
                        if (q && !box.find('.mobui-badge--q').length) box.append(badge(q, 'mobui-badge--q'));
                    });
                }

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

            Feed.markSeen();

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
        color: '#120705',
        done: false,

        // iOS, приложение с экрана «Домой» + black-translucent: страница уходит под статус-бар,
        // но высота окна (100%, innerHeight) остаётся «экран минус статус-бар». Снизу
        // остаётся пустая полоса. Меряем недостающую высоту и дотягиваем раскладку до низа
        gap: 0,

        // Высота видимой области для CSS: фиксированный блок top:0/bottom:0
        // (не зависит от того, насколько мы растянули html/body)
        viewportHeight: function () {
            var probe = document.createElement('div');
            probe.style.cssText = 'position:fixed;top:0;bottom:0;left:0;width:0;visibility:hidden;pointer-events:none';
            document.documentElement.appendChild(probe);
            var h = probe.getBoundingClientRect().height;
            probe.parentNode.removeChild(probe);
            return h;
        },

        // Стили отдельным тегом: Lampa перезаписывает классы у <html>
        applyGap: function (gap) {
            var el = document.getElementById('mobui-gap-style');
            if (!el) {
                el = document.createElement('style');
                el.id = 'mobui-gap-style';
                document.head.appendChild(el);
            }

            el.textContent = !gap ? '' :
                'html, body { height: calc(100% + ' + gap + 'px) !important; }' +
                '.mobui-bg { bottom: -' + gap + 'px !important; }' +
                '.mobui-tabbar { bottom: ' + (24 - gap) + 'px !important; }' +
                '.mobui-drawer, .mobui-sheet { bottom: -' + gap + 'px !important; }' +
                'body.mobui .settings__content { height: calc(100% + ' + gap + 'px) !important; bottom: auto !important; }';
        },

        ios: function () {
            var ua = navigator.userAgent || '';
            return /iP(hone|ad|od)/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
        },

        standalone: function () {
            if (window.navigator.standalone) return true;
            try {
                return ['standalone', 'fullscreen', 'minimal-ui'].some(function (m) { return window.matchMedia('(display-mode: ' + m + ')').matches; });
            } catch (e) { return false; }
        },

        fixGap: function () {
            // Отключено: при растяжке до низа iOS сама меняет высоту окна, растяжка
            // снимается и включается снова — интерфейс прыгает. Надёжно убрать полосу
            // снизу плагином нельзя
            return;
            if (!this.standalone()) return;

            var self = this;

            this.innerGap = 0;

            var measure = function () {
                var portrait = window.innerWidth <= (self.realHeight ? self.realHeight() : window.innerHeight);
                var full = portrait ? Math.max(screen.width, screen.height) : Math.min(screen.width, screen.height);
                var clamp = function (g) { g = Math.round(g); return g >= 20 && g <= 100 ? g : 0; };

                // Меряем по настоящей высоте окна (window.innerHeight): она не меняется от того,
                // что мы растянули html/body. Замер по фиксированному блоку после растяжки
                // давал 0 и сбрасывал исправление (на iPhone: экран 956, окно 894 → 62)
                var real = self.realHeight ? self.realHeight() : window.innerHeight;
                var gap = clamp(full - real);

                // Это именно ошибка iOS только когда страница реально под статус-баром
                // (safe-area сверху > 0) и не хватает ровно его высоты. Иначе (Android,
                // iOS без viewport-fit=cover, где окно честно начинается под статус-баром)
                // ничего не трогаем
                var top = Diag.env('top');
                if (!self.ios() || top <= 0 || Math.abs(gap - top) > 4) gap = 0;

                if (gap === self.gap) { pending = null; return; }

                // iOS на мгновение отдаёт другую высоту окна (во время перерисовки после
                // растяжки и т. п.). Если реагировать на каждый замер, растяжка включается
                // и выключается по кругу — всё прыгает. Поэтому меняем решение только
                // после нескольких одинаковых замеров подряд, а выключаем ещё осторожнее
                if (pending === gap) hits++;
                else { pending = gap; hits = 1; }

                var need = (self.gap && !gap) ? 4 : 2;
                if (hits < need) {
                    clearTimeout(recheck);
                    recheck = setTimeout(measure, 500);
                    return;
                }

                pending = null;
                self.gap = gap;
                self.innerGap = gap;
                self.applyGap(gap);
                try { window.dispatchEvent(new Event('resize')); } catch (e) { }
            };

            var pending = null, hits = 0, recheck;

            // Lampa считает высоты слоёв от window.innerHeight — отдаём ей полную высоту
            try {
                var desc = Object.getOwnPropertyDescriptor(window, 'innerHeight') || Object.getOwnPropertyDescriptor(Window.prototype, 'innerHeight');

                if (desc && desc.get) {
                    var getter = desc.get;
                    this.realHeight = function () { return getter.call(window); };

                    Object.defineProperty(window, 'innerHeight', {
                        configurable: true,
                        get: function () {
                            var real = self.realHeight();
                            // Не больше высоты экрана, даже если iOS сама отдала полное окно
                            return Math.min(real + self.innerGap, Math.max(screen.width, screen.height, real));
                        }
                    });
                }
            } catch (e) { }

            measure();
            [300, 1000, 2500].forEach(function (t) { setTimeout(measure, t); });
            window.addEventListener('orientationchange', function () { setTimeout(measure, 400); });
            // iOS может уменьшить окно уже после запуска (окно было во весь экран,
            // потом стало короче на статус-бар) — перемеряем при каждом изменении
            var again;
            window.addEventListener('resize', function () {
                clearTimeout(again);
                again = setTimeout(measure, 150);
            });
        },

        // Статус-бар без подложки в приложении с экрана «Домой»: страница уходит под него.
        // Делается как можно раньше, до отрисовки Lampa. После смены viewport iOS может
        // оставить страницу прокрученной — тогда фиксированные элементы видны на месте,
        // а нажатия уходят мимо и нижняя панель уезжает за край. Поэтому сбрасываем
        // прокрутку и даём Lampa пересчитать размеры
        translucent: function () {
            if (this.done) return;
            this.done = true;

            // Экспериментально и по умолчанию выключено: без тегов в исходном index.html
            // iOS применяет режим нестабильно (граница у статус-бара, обрезанное меню)
            var on = Lampa.Storage.get('mobui_translucent', 'false');
            if (!(on === true || on === 'true')) return;

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

            var fix = function () {
                if (window.scrollX || window.scrollY) window.scrollTo(0, 0);
                if (document.documentElement.scrollTop) document.documentElement.scrollTop = 0;
                if (document.body && document.body.scrollTop) document.body.scrollTop = 0;
            };

            var relayout = function () {
                fix();
                try { window.dispatchEvent(new Event('resize')); } catch (e) { }
            };

            [0, 100, 400, 1000, 2500].forEach(function (t) { setTimeout(relayout, t); });

            window.addEventListener('scroll', fix, { passive: true });
            window.addEventListener('orientationchange', function () { setTimeout(relayout, 300); });
            if (window.visualViewport) window.visualViewport.addEventListener('resize', fix);
        },
        init: function () {
            var self = this;
            var head = document.head;

            this.translucent();

            var theme = head.querySelector('meta[name="theme-color"]');
            if (!theme) {
                theme = document.createElement('meta');
                theme.name = 'theme-color';
                head.appendChild(theme);
            }

            var lock = function () {
                // Цвет фона под шапкой, если его удалось подобрать, иначе базовый
                var c = Bg.color || self.color;
                if (theme.getAttribute('content') !== c) theme.setAttribute('content', c);
            };

            lock();

            // Фон Lampa перекрашивает theme-color под картинку — возвращаем свой
            if (window.MutationObserver) new MutationObserver(lock).observe(theme, { attributes: true, attributeFilter: ['content'] });

            this.lockTheme = lock;

            document.documentElement.style.backgroundColor = self.color;
        }
    };

    /* Диагностика экрана (настройки Fluidity): размеры окна и безопасных зон */
    var Diag = {
        el: null,

        env: function (side) {
            var p = document.createElement('div');
            p.style.cssText = 'position:fixed;visibility:hidden;padding-top:env(safe-area-inset-' + side + ')';
            (document.body || document.documentElement).appendChild(p);
            var v = parseFloat(getComputedStyle(p).paddingTop) || 0;
            p.parentNode.removeChild(p);
            return v;
        },

        text: function () {
            var tab = document.querySelector('.mobui-tabbar');
            var vv = window.visualViewport;
            var rows = [
                'v ' + VERSION,
                'standalone: nav=' + !!window.navigator.standalone + ' media=' + StatusBar.standalone(),
                'screen: ' + screen.width + '×' + screen.height,
                'inner: ' + window.innerWidth + '×' + window.innerHeight + (StatusBar.realHeight ? ' (real ' + StatusBar.realHeight() + ')' : ''),
                'client: ' + document.documentElement.clientHeight + ', fixed: ' + StatusBar.viewportHeight() + (vv ? ', visual: ' + Math.round(vv.height) : ''),
                'safe: top ' + this.env('top') + ', bottom ' + this.env('bottom'),
                'gap: css ' + StatusBar.gap + ', js ' + (StatusBar.innerGap || 0),
                'colors: page ' + getComputedStyle(document.documentElement).backgroundColor + ', theme ' + ((document.querySelector('meta[name="theme-color"]') || {}).content || '-') + ', tint ' + (Bg.color || '-'),
                'body: ' + Math.round(document.body.getBoundingClientRect().height) + ', tabbar bottom: ' + (tab ? Math.round(tab.getBoundingClientRect().bottom) : '-'),
                'viewport: ' + ((document.querySelector('meta[name="viewport"]') || {}).content || '')
            ];
            return rows.join('\n');
        },

        toggle: function (on) {
            if (!on) {
                if (this.el) { this.el.remove(); this.el = null; }
                return;
            }

            if (!this.el) {
                this.el = $('<pre class="mobui-diag"></pre>');
                $('body').append(this.el);
                var self = this;
                onTap(this.el, function () { self.el.text(self.text()); });
            }

            this.el.text(this.text());
        }
    };

    function isMobile() {
        try { if (Lampa.Platform.screen('mobile')) return true; } catch (e) { }
        return window.innerWidth <= 600 && ('ontouchstart' in window);
    }

    function start() {
        if (window.mobui_started) return;
        window.mobui_started = true;

        Lampa.Manifest && Lampa.Manifest.plugins && Lampa.Manifest.plugins.push && Lampa.Manifest.plugins.push({ type: 'other', name: 'Fluidity', version: VERSION });

        if (!isMobile()) {
            console.log('Fluidity', 'not a mobile screen, skip');
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

        var parts = [TapGuard, CardPress, SelectBox, PersonRow, Bg, Header, Notify, TabBar, Drawer, Quality, Feed, Cards, Hero, Settings, Search];

        parts.forEach(function (part) {
            try { part.init(); }
            catch (e) { console.error('Fluidity', 'init error', e); }
        });

        var fill = Lampa.Storage.get('mobui_testfill', 'false');
        if (fill === true || fill === 'true') TestFill.toggle(true);

        var clear = Lampa.Storage.get('mobui_testclear', 'false');
        if (clear === true || clear === 'true') TestFill.clear(true);

        var diag = Lampa.Storage.get('mobui_diag', 'false');
        if (diag === true || diag === 'true') setTimeout(function () { Diag.toggle(true); }, 1500);

        console.log('Fluidity', 'started', VERSION);
    }

    // Тест: сплошной яркий фон без картинки и затемнения. Нужен, чтобы понять,
    // чьё затемнение под статус-баром — наше или системное (iOS)
    var TestFill = {
        toggle: function (on) {
            var el = document.getElementById('mobui-testfill-style');
            if (!on) { if (el) el.remove(); return; }
            if (!el) {
                el = document.createElement('style');
                el.id = 'mobui-testfill-style';
                document.head.appendChild(el);
            }
            el.textContent =
                'html, body, body.mobui, .mobui-bg { background: #ff00ff !important; }' +
                '.mobui-bg__img, .mobui-bg__overlay { display: none !important; }';
        },

        // iOS рисует под статус-баром полосу-градиент цветом фона страницы (html/body).
        // Проверка: убираем этот цвет совсем
        clear: function (on) {
            var el = document.getElementById('mobui-testclear-style');
            if (!on) { if (el) el.remove(); return; }
            if (!el) {
                el = document.createElement('style');
                el.id = 'mobui-testclear-style';
                document.head.appendChild(el);
            }
            el.textContent = 'html, body, body.mobui { background: transparent !important; background-color: transparent !important; }';
        }
    };

    function boot() {
        if (!window.Lampa || !Lampa.Listener) return setTimeout(boot, 200);

        try {
            if (isMobile()) {
                // Тёмный цвет фона сразу при загрузке: iOS красит им область статус-бара
                document.documentElement.style.backgroundColor = StatusBar.color;
                if (document.body) document.body.style.backgroundColor = StatusBar.color;
                StatusBar.fixGap();
                StatusBar.translucent();
                Continue.register();
            }
        } catch (e) { }

        if (window.appready) start();
        else {
            Lampa.Listener.follow('app', function (e) {
                if (e.type === 'ready') start();
            });
        }
    }

    boot();
})();
