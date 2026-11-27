/*!
 * Fluidity — мобильный интерфейс для Lampa по макетам из Figma (файл «lampac»).
 * https://github.com/werpenart/Lampa-Mob-UI-
 */
(function () {
    'use strict';

    if (window.mobui_plugin_loaded) return;
    window.mobui_plugin_loaded = true;

    var VERSION = '0.1.58';
    var ICONS = {"bell-dot": "<svg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><mask id=\"mobui-bell-cut\" maskUnits=\"userSpaceOnUse\" x=\"0\" y=\"0\" width=\"40\" height=\"40\"><rect width=\"40\" height=\"40\" fill=\"white\"/><circle cx=\"25\" cy=\"13\" r=\"5.5\" fill=\"black\"/></mask><g mask=\"url(#mobui-bell-cut)\"><path d=\"M18.5567 27.5C18.703 27.7533 18.9133 27.9637 19.1667 28.11C19.4201 28.2563 19.7075 28.3333 20 28.3333C20.2925 28.3333 20.5799 28.2563 20.8333 28.11C21.0867 27.9637 21.297 27.7533 21.4433 27.5\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/><path d=\"M12.7183 22.7717C12.6095 22.891 12.5376 23.0394 12.5115 23.1988C12.4855 23.3582 12.5063 23.5217 12.5714 23.6695C12.6366 23.8173 12.7433 23.943 12.8785 24.0312C13.0138 24.1195 13.1718 24.1665 13.3333 24.1667H26.6667C26.8282 24.1667 26.9862 24.1199 27.1216 24.0318C27.2569 23.9437 27.3637 23.8181 27.4291 23.6704C27.4944 23.5227 27.5154 23.3592 27.4895 23.1998C27.4637 23.0404 27.392 22.892 27.2833 22.7725C26.175 21.63 25 20.4158 25 16.6667C25 15.3406 24.4732 14.0688 23.5355 13.1311C22.5979 12.1935 21.3261 11.6667 20 11.6667C18.6739 11.6667 17.4021 12.1935 16.4645 13.1311C15.5268 14.0688 15 15.3406 15 16.6667C15 20.4158 13.8242 21.63 12.7183 22.7717Z\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/></g><circle cx=\"25\" cy=\"13\" r=\"4\" fill=\"white\"/></g></svg>", "bell": "<svg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><g><path d=\"M18.5567 27.5C18.703 27.7533 18.9133 27.9637 19.1667 28.11C19.4201 28.2563 19.7075 28.3333 20 28.3333C20.2925 28.3333 20.5799 28.2563 20.8333 28.11C21.0867 27.9637 21.297 27.7533 21.4433 27.5\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/><path d=\"M12.7183 22.7717C12.6095 22.891 12.5376 23.0394 12.5115 23.1988C12.4855 23.3582 12.5063 23.5217 12.5714 23.6695C12.6366 23.8173 12.7433 23.943 12.8785 24.0312C13.0138 24.1195 13.1718 24.1665 13.3333 24.1667H26.6667C26.8282 24.1667 26.9862 24.1199 27.1216 24.0318C27.2569 23.9437 27.3637 23.8181 27.4291 23.6704C27.4944 23.5227 27.5154 23.3592 27.4895 23.1998C27.4637 23.0404 27.392 22.892 27.2833 22.7725C26.175 21.63 25 20.4158 25 16.6667C25 15.3406 24.4732 14.0688 23.5355 13.1311C22.5979 12.1935 21.3261 11.6667 20 11.6667C18.6739 11.6667 17.4021 12.1935 16.4645 13.1311C15.5268 14.0688 15 15.3406 15 16.6667C15 20.4158 13.8242 21.63 12.7183 22.7717Z\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/></g></g></svg>", "bookmark-16": "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M11.3333 2C11.687 2 12.0261 2.14048 12.2761 2.39052C12.5262 2.64057 12.6667 2.97971 12.6667 3.33333V13.3333C12.6666 13.4501 12.6359 13.5648 12.5777 13.6659C12.5194 13.7671 12.4355 13.8512 12.3346 13.9098C12.2336 13.9683 12.119 13.9994 12.0023 13.9998C11.8855 14.0002 11.7707 13.9699 11.6693 13.912L8.66133 12.1933C8.45991 12.0783 8.23196 12.0178 8 12.0178C7.76804 12.0178 7.54009 12.0783 7.33867 12.1933L4.33067 13.912C4.22929 13.9699 4.11449 14.0002 3.99775 13.9998C3.881 13.9994 3.76641 13.9683 3.66543 13.9098C3.56445 13.8512 3.48063 13.7671 3.42235 13.6659C3.36407 13.5648 3.33337 13.4501 3.33333 13.3333V3.33333C3.33333 2.97971 3.47381 2.64057 3.72386 2.39052C3.97391 2.14048 4.31304 2 4.66667 2H11.3333Z\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/></g></svg>", "checkbox-off": "<svg width=\"17.5\" height=\"17.5\" viewBox=\"0 0 17.5 17.5\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><rect x=\"0.75\" y=\"0.75\" width=\"16\" height=\"16\" rx=\"4\" stroke=\"white\" stroke-width=\"1.5\"/></g></svg>", "checkbox-on": "<svg width=\"17.5\" height=\"17.5\" viewBox=\"0 0 17.5 17.5\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><rect x=\"0.75\" y=\"0.75\" width=\"16\" height=\"16\" rx=\"4\" stroke=\"white\" stroke-width=\"1.5\"/><path d=\"M5.75 8.75L7.75 10.75L11.75 6.75\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/></g></svg>", "chevron-left": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M14.4 18L8.4 12L14.4 6\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/></g></svg>", "chevron-right": "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M6 12L10 8L6 4\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/></g></svg>", "clear": "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M5.33301 5.33333L10.6663 10.6667\" stroke-width=\"1.33333\" stroke-linecap=\"round\" stroke=\"white\"/><path d=\"M10.667 5.33333L5.33366 10.6667\" stroke-width=\"1.33333\" stroke-linecap=\"round\" stroke=\"white\"/></g></svg>", "clock": "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><circle cx=\"8\" cy=\"8\" r=\"7\" stroke-width=\"1.5\" stroke=\"white\" stroke-opacity=\"0.48\"/><path d=\"M8 5V8L9.5 9.5\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\" stroke-opacity=\"0.48\"/></g></svg>", "close": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M8 8L16 16\" stroke-width=\"2\" stroke-linecap=\"round\" stroke=\"white\"/><path d=\"M16 8L8 16\" stroke-width=\"2\" stroke-linecap=\"round\" stroke=\"white\"/></g></svg>", "divider-v": "<svg width=\"16\" height=\"1\" viewBox=\"0 0 16 1\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><line y1=\"0.5\" x2=\"16\" y2=\"0.5\" stroke=\"white\" stroke-opacity=\"0.16\"/></svg>", "drag-handle": "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M3 3H13\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\" stroke-opacity=\"0.48\"/><path d=\"M3 8H13\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\" stroke-opacity=\"0.48\"/><path d=\"M3 13H13\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\" stroke-opacity=\"0.48\"/></g></svg>", "episode": "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M2.73196 6.02061L1 8L2.73196 9.97939C5.52084 13.1667 10.4792 13.1667 13.268 9.97939L15 8L13.268 6.02061C10.4792 2.83332 5.52084 2.83332 2.73196 6.02061Z\" fill=\"white\" stroke-width=\"1.5\" stroke-linejoin=\"round\" stroke=\"white\"/><circle cx=\"8\" cy=\"8\" r=\"2\" fill=\"#120605\"/></g></svg>", "m-cartoons": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M15 10V9\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/><path d=\"M7.084 14.302C7.39344 15.3665 8.04005 16.3019 8.92664 16.9675C9.81323 17.633 10.8919 17.9929 12.0005 17.9929C13.1091 17.9929 14.1878 17.633 15.0744 16.9675C15.9609 16.3019 16.6076 15.3665 16.917 14.302C16.9266 14.2662 16.9277 14.2286 16.9204 14.1923C16.913 14.156 16.8973 14.1218 16.8746 14.0926C16.8518 14.0633 16.8226 14.0397 16.7892 14.0237C16.7557 14.0076 16.7191 13.9995 16.682 14H7.32C7.28293 13.9995 7.24626 14.0076 7.21285 14.0237C7.17944 14.0397 7.1502 14.0633 7.12744 14.0926C7.10467 14.1218 7.08899 14.156 7.08163 14.1923C7.07427 14.2286 7.07442 14.2662 7.084 14.302Z\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/><path d=\"M9 10V9\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/><path d=\"M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/></g></svg>", "m-catalogue": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M7 2H17\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/><path d=\"M5 6H19\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/><path d=\"M5 10H19C20.1046 10 21 10.8954 21 12V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V12C3 10.8954 3.89543 10 5 10Z\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/></g></svg>", "m-console": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M10 9L7 12L10 15\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/><path d=\"M14 15L17 12L14 9\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/><path d=\"M5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3Z\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/></g></svg>", "m-edit": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M13 21H21\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/><path d=\"M21.174 6.812C21.7027 6.28342 21.9998 5.56647 21.9999 4.81885C22 4.07124 21.7031 3.35421 21.1745 2.8255C20.6459 2.29679 19.929 1.99971 19.1814 1.99962C18.4337 1.99953 17.7167 2.29642 17.188 2.825L3.842 16.174C3.60982 16.4055 3.43811 16.6905 3.342 17.004L2.021 21.356C1.99516 21.4425 1.9932 21.5343 2.01535 21.6219C2.0375 21.7094 2.08292 21.7892 2.1468 21.853C2.21067 21.9168 2.29062 21.9621 2.37816 21.9841C2.4657 22.0061 2.55756 22.004 2.644 21.978L6.997 20.658C7.31017 20.5628 7.59517 20.3921 7.827 20.161L21.174 6.812Z\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/></g></svg>", "m-favorites": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M17 3C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V20C18.9999 20.1751 18.9539 20.3472 18.8665 20.4989C18.7791 20.6506 18.6533 20.7767 18.5019 20.8646C18.3504 20.9525 18.1785 20.9991 18.0034 20.9997C17.8283 21.0003 17.6561 20.9549 17.504 20.868L12.992 18.29C12.6899 18.1174 12.3479 18.0266 12 18.0266C11.6521 18.0266 11.3101 18.1174 11.008 18.29L6.496 20.868C6.34394 20.9549 6.17174 21.0003 5.99662 20.9997C5.8215 20.9991 5.64961 20.9525 5.49814 20.8646C5.34667 20.7767 5.22094 20.6506 5.13352 20.4989C5.0461 20.3472 5.00006 20.1751 5 20V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17Z\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/></g></svg>", "m-filter": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M10 5H3\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/><path d=\"M12 19H3\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/><path d=\"M14 3V7\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/><path d=\"M16 17V21\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/><path d=\"M21 12H12\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/><path d=\"M21 19H16\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/><path d=\"M21 5H14\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/><path d=\"M8 10V14\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/><path d=\"M8 12H3\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/></g></svg>", "m-history": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M2 14V20C2 21.1046 2.89543 22 4 22H20C21.1046 22 22 21.1046 22 20V14H19.5C18.6716 14 18 14.6716 18 15.5C18 16.3284 17.3284 17 16.5 17H7.5C6.67157 17 6 16.3284 6 15.5C6 14.6716 5.32843 14 4.5 14H2Z\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/><path d=\"M19 10V4C19 2.89543 18.1046 2 17 2H7C5.89543 2 5 2.89543 5 4L5 10\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/><path d=\"M10 7H14\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/><path d=\"M10 11H14\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/></g></svg>", "m-home": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M3 10C2.99993 9.70907 3.06333 9.42162 3.18579 9.15772C3.30824 8.89381 3.4868 8.6598 3.709 8.472L10.709 2.472C11.07 2.16691 11.5274 1.99952 12 1.99952C12.4726 1.99952 12.93 2.16691 13.291 2.472L20.291 8.472C20.5132 8.6598 20.6918 8.89381 20.8142 9.15772C20.9367 9.42162 21.0001 9.70907 21 10V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V10Z\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/></g></svg>", "m-info": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/><path d=\"M12 16V12\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/><path d=\"M12 8H12.01\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/></g></svg>", "m-movies": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3Z\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/><path d=\"M7 3V21\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/><path d=\"M3 7.5H7\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/><path d=\"M3 12H21\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/><path d=\"M3 16.5H7\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/><path d=\"M17 3V21\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/><path d=\"M17 7.5H21\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/><path d=\"M17 16.5H21\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/></g></svg>", "m-persons": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M18 21C18 19.4087 17.3679 17.8826 16.2426 16.7574C15.1174 15.6321 13.5913 15 12 15C10.4087 15 8.88258 15.6321 7.75736 16.7574C6.63214 17.8826 6 19.4087 6 21\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/><path d=\"M16 11C16 13.2091 14.2091 15 12 15C9.79086 15 8 13.2091 8 11C8 8.79086 9.79086 7 12 7C14.2091 7 16 8.79086 16 11Z\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/><path d=\"M5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3Z\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/></g></svg>", "m-schedule": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M16 2V5\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/><path d=\"M17 15.5V17.2L18 17.825\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/><path d=\"M21 8.936V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H8.935\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/><path d=\"M3 9H12.873\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/><path d=\"M8 2V5\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/><path d=\"M22 17C22 19.7614 19.7614 22 17 22C14.2386 22 12 19.7614 12 17C12 14.2386 14.2386 12 17 12C19.7614 12 22 14.2386 22 17Z\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/></g></svg>", "m-series": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M15.033 9.44C15.1312 9.49683 15.2127 9.57849 15.2694 9.67678C15.3261 9.77507 15.3559 9.88654 15.3559 10C15.3559 10.1135 15.3261 10.2249 15.2694 10.3232C15.2127 10.4215 15.1312 10.5032 15.033 10.56L10.968 12.912C10.8698 12.9688 10.7584 12.9987 10.645 12.9987C10.5316 12.9987 10.4202 12.9688 10.322 12.912C10.2238 12.8552 10.1424 12.7735 10.0858 12.6752C10.0293 12.5769 9.9997 12.4654 10 12.352V7.648C9.9998 7.53473 10.0294 7.42341 10.0859 7.32523C10.1424 7.22705 10.2237 7.14548 10.3218 7.08871C10.4198 7.03195 10.531 7.002 10.6443 7.00187C10.7576 7.00175 10.8689 7.03145 10.967 7.088L15.033 9.44Z\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/><path d=\"M7 21H17\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/><path d=\"M4 3H20C21.1046 3 22 3.89543 22 5V15C22 16.1046 21.1046 17 20 17H4C2.89543 17 2 16.1046 2 15V5C2 3.89543 2.89543 3 4 3Z\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/></g></svg>", "m-settings": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M21 16V8C20.9996 7.64927 20.9071 7.30481 20.7315 7.00116C20.556 6.69752 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69752 3.26846 7.00116C3.09294 7.30481 3.00036 7.64927 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.998 12 21.998C12.3511 21.998 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/><path d=\"M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/></g></svg>", "m-subscriptions": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M7 2H17\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/><path d=\"M5 6H19\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/><path d=\"M5 10H19C20.1046 10 21 10.8954 21 12V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V12C3 10.8954 3.89543 10 5 10Z\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/><path d=\"M12.0049 14V18\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/><path d=\"M14.0049 16L10.0049 16\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/></g></svg>", "m-torrents": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M12 15L16 19\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/><path d=\"M2.352 10.648C2.12606 10.874 1.99913 11.1804 1.99913 11.5C1.99913 11.8196 2.12606 12.126 2.352 12.352L4.648 14.648C4.87398 14.8739 5.18045 15.0009 5.5 15.0009C5.81955 15.0009 6.12602 14.8739 6.352 14.648L12.381 8.619C12.578 8.42202 12.8118 8.26576 13.0692 8.15916C13.3266 8.05255 13.6024 7.99768 13.881 7.99768C14.1596 7.99768 14.4354 8.05255 14.6928 8.15916C14.9502 8.26576 15.184 8.42202 15.381 8.619C15.578 8.81598 15.7342 9.04984 15.8408 9.30721C15.9475 9.56458 16.0023 9.84042 16.0023 10.119C16.0023 10.3976 15.9475 10.6734 15.8408 10.9308C15.7342 11.1882 15.578 11.422 15.381 11.619L9.352 17.648C9.12606 17.874 8.99913 18.1804 8.99913 18.5C8.99913 18.8196 9.12606 19.126 9.352 19.352L11.648 21.648C11.874 21.8739 12.1804 22.0009 12.5 22.0009C12.8196 22.0009 13.126 21.8739 13.352 21.648L19.717 15.281C21.1756 13.8222 21.9949 11.8437 21.9947 9.78079C21.9945 7.71789 21.1748 5.73956 19.716 4.281C18.9937 3.5588 18.1362 2.98594 17.1924 2.59513C16.2487 2.20433 15.2372 2.00323 14.2158 2.00333C12.1529 2.00351 10.1746 2.82318 8.716 4.282L2.352 10.648Z\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/><path d=\"M5 8L9 12\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/></g></svg>", "menu": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M3 4H17\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/><path d=\"M3 10H11\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/><path d=\"M3 16H17\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/></g></svg>", "mic": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M10 15.8333V18.3333\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/><path d=\"M15.8337 8.33333V9.99999C15.8337 11.5471 15.2191 13.0308 14.1251 14.1248C13.0312 15.2187 11.5474 15.8333 10.0003 15.8333C8.45323 15.8333 6.9695 15.2187 5.87554 14.1248C4.78157 13.0308 4.16699 11.5471 4.16699 9.99999V8.33333\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/><path d=\"M10 1.66667C11.3807 1.66667 12.5 2.78595 12.5 4.16667V10C12.5 11.3807 11.3807 12.5 10 12.5C8.61929 12.5 7.5 11.3807 7.5 10V4.16667C7.5 2.78595 8.61929 1.66667 10 1.66667Z\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/></g></svg>", "pause": "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M11.6 3H10.4C10.1791 3 10 3.24873 10 3.55556V12.4444C10 12.7513 10.1791 13 10.4 13H11.6C11.8209 13 12 12.7513 12 12.4444V3.55556C12 3.24873 11.8209 3 11.6 3Z\" fill=\"white\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/><path d=\"M5.6 3H4.4C4.17909 3 4 3.24873 4 3.55556V12.4444C4 12.7513 4.17909 13 4.4 13H5.6C5.82091 13 6 12.7513 6 12.4444V3.55556C6 3.24873 5.82091 3 5.6 3Z\" fill=\"white\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/></g></svg>", "play-16": "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M4.5 3.2C4.5 2.64 5.1 2.3 5.58 2.59L12.6 7.39C13.03 7.68 13.03 8.32 12.6 8.61L5.58 13.41C5.1 13.7 4.5 13.36 4.5 12.8V3.2Z\" fill=\"white\" stroke=\"white\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>", "play": "<svg width=\"8.79844\" height=\"11.685\" viewBox=\"0 0 8.79844 11.685\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0 2.00375C0 0.326742 1.93986 -0.605604 3.24939 0.442017L8.04783 4.28077C9.04864 5.08142 9.04864 6.60359 8.04783 7.40424L3.24939 11.243C1.93986 12.2906 0 11.3583 0 9.68126V2.00375Z\" fill=\"#292929\"/></svg>", "plus": "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M3 8H13\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/><path d=\"M8 3V13\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/></g></svg>", "s-cache": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M15.2 3C15.7275 3.00751 16.2307 3.22317 16.6 3.6L20.4 7.4C20.7768 7.76926 20.9925 8.27246 21 8.8V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H15.2Z\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/><path d=\"M17 21V14C17 13.7348 16.8946 13.4804 16.7071 13.2929C16.5196 13.1054 16.2652 13 16 13H8C7.73478 13 7.48043 13.1054 7.29289 13.2929C7.10536 13.4804 7 13.7348 7 14V21\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/><path d=\"M7 3V7C7 7.26522 7.10536 7.51957 7.29289 7.70711C7.48043 7.89464 7.73478 8 8 8H15\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/></g></svg>", "s-channels": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><rect x=\"2\" y=\"8\" width=\"20\" height=\"8\" rx=\"2\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/><path d=\"M6 3H18\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/><path d=\"M6 21H18\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/></g></svg>", "s-chevron": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M9 18L15 12L9 6\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/></g></svg>", "s-extensions": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3Z\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/><path d=\"M8 12H16\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/><path d=\"M12 8V16\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/></g></svg>", "s-interface": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M4 3H9C9.55228 3 10 3.44772 10 4V11C10 11.5523 9.55228 12 9 12H4C3.44772 12 3 11.5523 3 11V4C3 3.44772 3.44772 3 4 3Z\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/><path d=\"M15 3H20C20.5523 3 21 3.44772 21 4V7C21 7.55228 20.5523 8 20 8H15C14.4477 8 14 7.55228 14 7V4C14 3.44772 14.4477 3 15 3Z\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/><path d=\"M15 12H20C20.5523 12 21 12.4477 21 13V20C21 20.5523 20.5523 21 20 21H15C14.4477 21 14 20.5523 14 20V13C14 12.4477 14.4477 12 15 12Z\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/><path d=\"M4 16H9C9.55228 16 10 16.4477 10 17V20C10 20.5523 9.55228 21 9 21H4C3.44772 21 3 20.5523 3 20V17C3 16.4477 3.44772 16 4 16Z\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/></g></svg>", "s-novaplus": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M11.017 2.814C11.0598 2.5846 11.1816 2.37742 11.3611 2.22832C11.5406 2.07922 11.7666 1.99761 12 1.99761C12.2334 1.99761 12.4594 2.07922 12.6389 2.22832C12.8184 2.37742 12.9402 2.5846 12.983 2.814L14.034 8.372C14.1086 8.76715 14.3007 9.13062 14.585 9.41497C14.8694 9.69932 15.2329 9.89135 15.628 9.966L21.186 11.017C21.4154 11.0598 21.6226 11.1816 21.7717 11.3611C21.9208 11.5406 22.0024 11.7666 22.0024 12C22.0024 12.2334 21.9208 12.4594 21.7717 12.6389C21.6226 12.8184 21.4154 12.9402 21.186 12.983L15.628 14.034C15.2329 14.1086 14.8694 14.3007 14.585 14.585C14.3007 14.8694 14.1086 15.2329 14.034 15.628L12.983 21.186C12.9402 21.4154 12.8184 21.6226 12.6389 21.7717C12.4594 21.9208 12.2334 22.0024 12 22.0024C11.7666 22.0024 11.5406 21.9208 11.3611 21.7717C11.1816 21.6226 11.0598 21.4154 11.017 21.186L9.966 15.628C9.89135 15.2329 9.69932 14.8694 9.41497 14.585C9.13062 14.3007 8.76715 14.1086 8.372 14.034L2.814 12.983C2.5846 12.9402 2.37742 12.8184 2.22832 12.6389C2.07922 12.4594 1.99761 12.2334 1.99761 12C1.99761 11.7666 2.07922 11.5406 2.22832 11.3611C2.37742 11.1816 2.5846 11.0598 2.814 11.017L8.372 9.966C8.76715 9.89135 9.13062 9.69932 9.41497 9.41497C9.69932 9.13062 9.89135 8.76715 9.966 8.372L11.017 2.814Z\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/><path d=\"M20 2V6\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/><path d=\"M22 4H18\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/><path d=\"M6 20C6 21.1046 5.10457 22 4 22C2.89543 22 2 21.1046 2 20C2 18.8954 2.89543 18 4 18C5.10457 18 6 18.8954 6 20Z\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/></g></svg>", "s-other": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z\" fill=\"white\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/><path d=\"M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z\" fill=\"white\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/><path d=\"M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z\" fill=\"white\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/></g></svg>", "s-parental": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M20 13C20 18 16.5 20.5 12.34 21.95C12.1222 22.0238 11.8855 22.0203 11.67 21.94C7.5 20.5 4 18 4 13V6C4 5.73478 4.10536 5.48043 4.29289 5.29289C4.48043 5.10536 4.73478 5 5 5C7 5 9.5 3.8 11.24 2.28C11.4519 2.099 11.7214 1.99955 12 1.99955C12.2786 1.99955 12.5481 2.099 12.76 2.28C14.51 3.81 17 5 19 5C19.2652 5 19.5196 5.10536 19.7071 5.29289C19.8946 5.48043 20 5.73478 20 6V13Z\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/><path d=\"M9 12L11 14L15 10\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/></g></svg>", "s-parser": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M21 5H3\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/><path d=\"M10 12H3\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/><path d=\"M10 19H3\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/><path d=\"M20 15C20 16.6569 18.6569 18 17 18C15.3431 18 14 16.6569 14 15C14 13.3431 15.3431 12 17 12C18.6569 12 20 13.3431 20 15Z\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/><path d=\"M21.0001 19L19.1001 17.1\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/></g></svg>", "s-player": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M10 9.75226C9.99962 9.61916 10.033 9.48835 10.0966 9.37326C10.1603 9.25817 10.252 9.16295 10.3622 9.09737C10.4725 9.03178 10.5974 8.9982 10.7241 9.00007C10.8508 9.00195 10.9748 9.0392 11.0833 9.10801L14.6515 11.3558C14.7577 11.4223 14.8457 11.5166 14.9068 11.6295C14.9679 11.7425 15 11.8701 15 12C15 12.1299 14.9679 12.2575 14.9068 12.3705C14.8457 12.4834 14.7577 12.5777 14.6515 12.6442L11.0833 14.892C10.9747 14.9608 10.8507 14.9981 10.7239 14.9999C10.5972 15.0018 10.4722 14.9681 10.3619 14.9024C10.2516 14.8368 10.16 14.7414 10.0964 14.6263C10.0328 14.5111 9.9995 14.3802 10 14.247V9.75226Z\" fill=\"white\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/><path d=\"M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/></g></svg>", "s-plugins": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M12 22V17\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/><path d=\"M15 8V2\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/><path d=\"M17 8C17.2652 8 17.5196 8.10536 17.7071 8.29289C17.8946 8.48043 18 8.73478 18 9V13C18 14.0609 17.5786 15.0783 16.8284 15.8284C16.0783 16.5786 15.0609 17 14 17H10C8.93913 17 7.92172 16.5786 7.17157 15.8284C6.42143 15.0783 6 14.0609 6 13V9C6 8.73478 6.10536 8.48043 6.29289 8.29289C6.48043 8.10536 6.73478 8 7 8H17Z\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/><path d=\"M9 8V2\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/></g></svg>", "s-remote": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M10.852 19.772L10.469 20.696\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/><path d=\"M13.148 14.228L13.531 13.305\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/><path d=\"M13.148 19.772C13.512 19.6212 13.8428 19.4003 14.1214 19.1217C14.4 18.8431 14.6211 18.5123 14.7719 18.1483C14.9227 17.7843 15.0003 17.3942 15.0003 17.0002C15.0003 16.6062 14.9228 16.216 14.772 15.852C14.6212 15.488 14.4003 15.1572 14.1217 14.8786C13.8431 14.6 13.5123 14.3789 13.1483 14.2281C12.7843 14.0773 12.3942 13.9997 12.0002 13.9997C11.6062 13.9997 11.216 14.0772 10.852 14.228L10.469 13.305\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/><path d=\"M13.53 20.696L13.148 19.772C12.4128 20.0765 11.5868 20.0764 10.8517 19.7719C10.1165 19.4673 9.53247 18.8832 9.228 18.148C8.92353 17.4128 8.92358 16.5868 9.22814 15.8517C9.5327 15.1165 10.1168 14.5325 10.852 14.228\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/><path d=\"M14.772 15.852L15.695 15.469\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/><path d=\"M14.772 18.148L15.695 18.531\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/><path d=\"M4.2 15.1C3.51691 14.456 2.97033 13.6813 2.59278 12.8218C2.21522 11.9623 2.0144 11.0356 2.00227 10.0969C1.99014 9.15826 2.16694 8.22672 2.52216 7.35776C2.87738 6.48879 3.40376 5.70016 4.06998 5.03877C4.7362 4.37738 5.52865 3.85676 6.40017 3.50787C7.2717 3.15898 8.2045 2.98896 9.14307 3.00792C10.0816 3.02688 11.0068 3.23444 11.8635 3.61824C12.7203 4.00204 13.491 4.55425 14.13 5.242C14.8612 6.02802 15.4018 6.97167 15.71 8H17.5C18.4539 8.01286 19.379 8.32852 20.1418 8.90141C20.9046 9.4743 21.4655 10.2748 21.7437 11.1873C22.0219 12.0998 22.003 13.0771 21.6895 13.9781C21.3761 14.8791 20.7845 15.6572 20 16.2\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/><path d=\"M9.228 15.852L8.305 15.469\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/><path d=\"M9.228 18.148L8.305 18.531\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/></g></svg>", "s-sync": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.516 3.00947 16.931 3.99122 18.74 5.74L21 8\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/><path d=\"M21 3V8H16\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/><path d=\"M21 12C21 14.3869 20.0518 16.6761 18.364 18.364C16.6761 20.0518 14.3869 21 12 21C9.48395 20.9905 7.06897 20.0088 5.26 18.26L3 16\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/><path d=\"M8 16H3V21\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/></g></svg>", "s-tmdb": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"2.75\" y=\"2.75\" width=\"18.5\" height=\"18.5\" rx=\"3.25\" stroke=\"white\" stroke-width=\"1.5\"/><text x=\"12\" y=\"11\" text-anchor=\"middle\" fill=\"white\" font-family=\"Quicksand, Inter, sans-serif\" font-weight=\"700\" font-size=\"7\" letter-spacing=\"0.77\">TM</text><text x=\"12\" y=\"17.5\" text-anchor=\"middle\" fill=\"white\" font-family=\"Quicksand, Inter, sans-serif\" font-weight=\"700\" font-size=\"7\" letter-spacing=\"0.77\">DB</text></svg>", "s-torrserver": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M4 2H20C21.1046 2 22 2.89543 22 4V8C22 9.10457 21.1046 10 20 10H4C2.89543 10 2 9.10457 2 8V4C2 2.89543 2.89543 2 4 2Z\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/><path d=\"M4 14H20C21.1046 14 22 14.8954 22 16V20C22 21.1046 21.1046 22 20 22H4C2.89543 22 2 21.1046 2 20V16C2 14.8954 2.89543 14 4 14Z\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/><path d=\"M6 6H6.01\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/><path d=\"M6 18H6.01\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/></g></svg>", "s-uafresh": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M4 22V4C4 3.84475 4.03614 3.69164 4.10557 3.55279C4.175 3.41393 4.2758 3.29315 4.4 3.2C5.43858 2.42107 6.70178 2 8 2C11 2 13 4 15.333 4C16.6663 4 17.6887 3.73333 18.4 3.2C18.5486 3.08857 18.7252 3.02072 18.9102 3.00404C19.0952 2.98736 19.2811 3.02252 19.4472 3.10557C19.6133 3.18863 19.753 3.31629 19.8507 3.47427C19.9483 3.63224 20 3.81429 20 4V14C20 14.1552 19.9639 14.3084 19.8944 14.4472C19.825 14.5861 19.7242 14.7069 19.6 14.8C18.5614 15.5789 17.2982 16 16 16C13 16 11 14 8 14C6.52412 14 5.10002 14.544 4 15.528\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/></g></svg>", "search-20": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M17.5 17.5L13.8833 13.8833M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z\" stroke-width=\"1.25\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"white\"/></g></svg>", "star-12": "<svg width=\"10.2648\" height=\"9.81143\" viewBox=\"0 0 10.2648 9.81143\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M4.68404 0.278717C4.86744 -0.0929054 5.39737 -0.0929061 5.58077 0.278717L6.77942 2.70745C6.85226 2.85502 6.99304 2.95731 7.15589 2.98097L9.83616 3.37044C10.2463 3.43003 10.41 3.93402 10.1133 4.22328L8.17381 6.11379C8.05597 6.22866 8.00219 6.39416 8.03001 6.55636L8.48785 9.22579C8.55791 9.63425 8.12919 9.94573 7.76238 9.75288L5.36508 8.49255C5.21941 8.41597 5.0454 8.41597 4.89973 8.49255L2.50243 9.75288C2.13562 9.94573 1.7069 9.63425 1.77695 9.2258L2.2348 6.55636C2.26262 6.39416 2.20884 6.22866 2.091 6.11379L0.151541 4.22329C-0.145218 3.93402 0.0185367 3.43003 0.428647 3.37044L3.10891 2.98097C3.27177 2.95731 3.41255 2.85502 3.48538 2.70745L4.68404 0.278717Z\" fill=\"white\"/></svg>", "star-16": "<svg width=\"12.9212\" height=\"12.3868\" viewBox=\"0 0 12.9212 12.3868\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5.56385 0.557434C5.93066 -0.185812 6.99051 -0.185811 7.35732 0.557435L8.57906 3.03294C8.72472 3.32808 9.00628 3.53265 9.33199 3.57998L12.0639 3.97695C12.8841 4.09613 13.2116 5.1041 12.6181 5.68264L10.6413 7.60955C10.4056 7.83929 10.298 8.17029 10.3537 8.49468L10.8203 11.2155C10.9605 12.0324 10.103 12.6554 9.36939 12.2697L6.92593 10.9851C6.6346 10.8319 6.28657 10.8319 5.99524 10.9851L3.55177 12.2697C2.81815 12.6554 1.96071 12.0324 2.10083 11.2155L2.56749 8.49468C2.62312 8.17029 2.51558 7.83929 2.27989 7.60955L0.303081 5.68264C-0.290436 5.1041 0.0370749 4.09613 0.857295 3.97695L3.58918 3.57998C3.91489 3.53265 4.19645 3.32808 4.34211 3.03294L5.56385 0.557434Z\" fill=\"white\"/></svg>", "tab-bookmark": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M14.1667 2.5C14.6087 2.5 15.0326 2.67559 15.3452 2.98816C15.6577 3.30072 15.8333 3.72464 15.8333 4.16667V16.6667C15.8333 16.8126 15.7949 16.956 15.7221 17.0824C15.6492 17.2089 15.5444 17.314 15.4182 17.3872C15.292 17.4604 15.1487 17.4992 15.0028 17.4997C14.8569 17.5002 14.7134 17.4624 14.5867 17.39L10.8267 15.2417C10.5749 15.0978 10.29 15.0222 10 15.0222C9.71005 15.0222 9.42511 15.0978 9.17333 15.2417L5.41333 17.39C5.28662 17.4624 5.14312 17.5002 4.99718 17.4997C4.85125 17.4992 4.70801 17.4604 4.58179 17.3872C4.45556 17.314 4.35078 17.2089 4.27793 17.0824C4.20508 16.956 4.16671 16.8126 4.16667 16.6667V4.16667C4.16667 3.72464 4.34226 3.30072 4.65482 2.98816C4.96738 2.67559 5.39131 2.5 5.83333 2.5H14.1667Z\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/></g></svg>", "tab-home": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M2.5 8.33333C2.49994 8.09089 2.55278 7.85135 2.65482 7.63143C2.75687 7.41151 2.90566 7.2165 3.09083 7.06L8.92417 2.06C9.22499 1.80576 9.60613 1.66627 10 1.66627C10.3939 1.66627 10.775 1.80576 11.0758 2.06L16.9092 7.06C17.0943 7.2165 17.2431 7.41151 17.3452 7.63143C17.4472 7.85135 17.5001 8.09089 17.5 8.33333V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V8.33333Z\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/></g></svg>", "tab-search": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M17.5 17.5L13.8833 13.8833M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z\" stroke-width=\"1.25\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/></g></svg>", "tab-settings": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M17.5 13.3333V6.66667C17.4997 6.3744 17.4225 6.08734 17.2763 5.8343C17.13 5.58126 16.9198 5.37114 16.6667 5.225L10.8333 1.89167C10.58 1.74539 10.2926 1.66838 10 1.66838C9.70744 1.66838 9.42003 1.74539 9.16667 1.89167L3.33333 5.225C3.08022 5.37114 2.86998 5.58126 2.72372 5.8343C2.57745 6.08734 2.5003 6.3744 2.5 6.66667V13.3333C2.5003 13.6256 2.57745 13.9127 2.72372 14.1657C2.86998 14.4187 3.08022 14.6289 3.33333 14.775L9.16667 18.1083C9.42003 18.2546 9.70744 18.3316 10 18.3316C10.2926 18.3316 10.58 18.2546 10.8333 18.1083L16.6667 14.775C16.9198 14.6289 17.13 14.4187 17.2763 14.1657C17.4225 13.9127 17.4997 13.6256 17.5 13.3333Z\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/><path d=\"M13.3333 10C13.3333 11.8409 11.8409 13.3333 10 13.3333C8.15905 13.3333 6.66667 11.8409 6.66667 10C6.66667 8.15905 8.15905 6.66667 10 6.66667C11.8409 6.66667 13.3333 8.15905 13.3333 10Z\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"currentColor\"/></g></svg>"};
    var CSS = "html{overflow: hidden;height: 100%;}body.mobui{--mu-glass: rgba(41,41,41,0.32);--mu-glass-border: rgba(255,255,255,0.08);--mu-text-2: rgba(255,255,255,0.64);--mu-text-3: rgba(255,255,255,0.48);--mu-dark: #292929;--mu-bg: #33130e;--mu-safe-top: env(safe-area-inset-top,0px);--mu-safe-bottom: env(safe-area-inset-bottom,0px);--mu-head: 64px;--mu-sans: 'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;--mu-mono: 'Roboto Mono',ui-monospace,SFMono-Regular,Menlo,monospace;background: #120705 !important;font-family: var(--mu-sans);}body.mobui svg{display: block;}.mobui-bg{position: fixed;inset: 0;z-index: 0;pointer-events: none;background: var(--mu-bg);overflow: hidden;}.mobui-bg__img{position: absolute;inset: 0;width: 100%;height: 100%;display: block;transform: scaleX(-1);opacity: 0;transition: opacity 0.6s;}.mobui-bg__img.ready{opacity: 1;}.mobui-bg__overlay{position: absolute;inset: 0;background: rgba(0,0,0,0.64);}body.mobui .background,body.mobui .navigation-bar,body.mobui .head__body{display: none !important;}body.mobui .wrap{position: relative;z-index: 1;}body.mobui .scroll--mask{-webkit-mask-image: none !important;mask-image: none !important;}.mobui-badge{display: inline-flex;align-items: center;padding: 3px 8px;border-radius: 8px;border: 1px solid var(--mu-glass-border);background: var(--mu-glass);-webkit-backdrop-filter: blur(14px);backdrop-filter: blur(14px);font: 500 10px/12px var(--mu-mono);color: #fff;text-transform: uppercase;white-space: nowrap;}.mobui-badge--big{padding: 7px 12px;border-radius: 12px;font-size: 14px;line-height: 16px;}.mobui-rating{display: inline-flex;align-items: center;gap: 4px;padding: 3px 8px;border-radius: 8px;border: 1px solid var(--mu-glass-border);background: var(--mu-glass);-webkit-backdrop-filter: blur(14px);backdrop-filter: blur(14px);font: 500 12px/14px var(--mu-mono);color: #fff;white-space: nowrap;}.mobui-rating svg{width: 12px;height: 12px;}.mobui-rating--big{padding: 7px 12px;border-radius: 12px;font-size: 14px;line-height: 16px;}.mobui-rating--big svg{width: 16px;height: 16px;}.mobui-sep{display: inline-block;flex-shrink: 0;width: 4px;height: 4px;border-radius: 2px;background: rgba(255,255,255,0.24);}.mobui-divider{flex-shrink: 0;height: 1px;background: rgba(255,255,255,0.08);}.mobui-btn{display: inline-flex;align-items: center;justify-content: center;gap: 12px;padding: 12px 24px;border-radius: 48px;font: 700 14px/16px var(--mu-mono);text-transform: uppercase;white-space: nowrap;cursor: pointer;-webkit-tap-highlight-color: transparent;}.mobui-btn--white{background: #fff;color: var(--mu-dark);}.mobui-btn--ghost{background: transparent;color: #fff;}.mobui-avatar{flex-shrink: 0;width: 40px;height: 40px;box-sizing: border-box;border-radius: 999px;border: 1px solid rgba(255,255,255,0.16);background: #404979;display: flex;align-items: center;justify-content: center;font: 400 20px/24px var(--mu-mono);color: #fff;}.mobui-chevron svg{width: 16px;height: 16px;}body.mobui .head{background: transparent !important;padding-top: var(--mu-safe-top);}.mobui-head{height: var(--mu-head);box-sizing: border-box;padding: 8px 12px;display: flex;align-items: center;justify-content: space-between;}.mobui-head__leading{display: flex;align-items: center;gap: 16px;min-width: 0;}.mobui-head__menu{flex-shrink: 0;width: 48px;height: 48px;border-radius: 999px;display: flex;align-items: center;justify-content: center;cursor: pointer;}.mobui-head__menu svg{width: 20px;height: 20px;}.mobui-head__title{font: 400 24px/32px var(--mu-sans);color: #fff;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}.mobui-head__actions{display: flex;align-items: center;gap: 16px;flex-shrink: 0;}.mobui-head__bell{width: 40px;height: 40px;cursor: pointer;}.mobui-head__bell svg{width: 40px;height: 40px;}.mobui-head__bell:not(.has-new) circle{display: none;}.mobui-head__avatar{cursor: pointer;font-family: var(--mu-sans);font-weight: 500;line-height: 20px;}body.mobui .wrap__content{padding-top: calc(var(--mu-head) + var(--mu-safe-top)) !important;}body.mobui .activity__body>div>.scroll>.scroll__content{padding-top: 11px;padding-bottom: calc(112px + var(--mu-safe-bottom));}body.mobui .items-line{padding-bottom: 40px;}body.mobui .items-line__head{padding: 0 24px;margin-bottom: 16px;display: flex;align-items: center;justify-content: space-between;min-height: 32px;}body.mobui .items-line__title{font: 500 24px/32px var(--mu-sans) !important;color: #fff;opacity: 1 !important;}body.mobui .items-line__title .full-person{display: block !important;width: auto !important;margin: 0 !important;padding: 0 !important;background: none !important;box-shadow: none !important;}body.mobui .items-line__title .full-person__photo{display: none !important;}body.mobui .items-line__title .full-person__body{padding: 0 !important;margin: 0 !important;}body.mobui .items-line__title .full-person__name{font: 500 24px/32px var(--mu-sans) !important;color: #fff !important;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;padding: 0 !important;margin: 0 !important;}body.mobui .items-line__title{min-width: 0;flex: 1;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}body.mobui .items-line__more{flex-shrink: 0;margin-left: 16px;}body.mobui .items-line .card-more{display: none !important;}body.mobui .items-line__more{display: flex;align-items: center;gap: 4px;padding: 7px 5px 7px 12px;border-radius: 8px;border: 1px solid var(--mu-glass-border);background: var(--mu-glass);-webkit-backdrop-filter: blur(14px);backdrop-filter: blur(14px);font: 400 14px/16px var(--mu-mono);color: #fff;height: auto;}body.mobui .items-line__more.focus,body.mobui .items-line__more.hover{background: rgba(255,255,255,0.16);color: #fff;}body.mobui .items-line .scroll{padding: 0;}body.mobui .items-line .scroll__content{padding: 0;}body.mobui .items-line .scroll__body{display: flex;gap: 16px;padding: 0 32px 0 24px;width: max-content;}body.mobui .card.mobui-card-el{width: 160px !important;margin: 0 !important;flex-shrink: 0;display: flex;flex-direction: column;gap: 8px;padding: 0 !important;}body.mobui .card.mobui-card-el .card__view{width: 100%;height: 240px;padding-bottom: 0 !important;margin-bottom: 0;border-radius: 12px;position: relative;overflow: hidden;}body.mobui .card.mobui-card-el .card__view::after{content: '';position: absolute;inset: 0;border-radius: 12px;border: 1px solid rgba(255,255,255,0.16);box-shadow: inset 0 1px 2px rgba(255,255,255,0.16),inset 0 4px 16px rgba(0,0,0,0.08);pointer-events: none;z-index: 3;}body.mobui .card.mobui-card-el .card__img{position: absolute;inset: 0;width: 100%;height: 100%;object-fit: cover;border-radius: 12px;background-color: rgba(255,255,255,0.06);}body.mobui .card.mobui-card-el.focus .card__view::after,body.mobui .card.mobui-card-el.hover .card__view::after{border-color: rgba(255,255,255,0.48);}body.mobui .card.mobui-card-el .card__view::before{display: none !important;}body.mobui .card.mobui-card-el .card__vote,body.mobui .card.mobui-card-el .card__type,body.mobui .card.mobui-card-el .card__quality,body.mobui .card.mobui-card-el .card__age{display: none !important;}body.mobui .card.mobui-card-el .card__icons{top: auto;bottom: 8px;right: 8px;left: auto;z-index: 2;}.mobui-badges{position: absolute;left: 8px;top: 8px;display: flex;gap: 4px;z-index: 2;}.mobui-card__rating{position: absolute;left: 8px;bottom: 8px;z-index: 2;}body.mobui .card.mobui-card-el .card__title{font: 600 16px/20px var(--mu-sans) !important;color: #fff;margin: 0;padding: 0;max-height: 40px;overflow: hidden;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;white-space: normal;}.mobui-meta{display: flex;align-items: center;gap: 8px;font: 500 12px/14px var(--mu-mono);color: var(--mu-text-2);white-space: nowrap;overflow: hidden;}.mobui-meta:empty{display: none;}.mobui-meta-row{display: flex;align-items: center;justify-content: space-between;gap: 8px;}.mobui-meta-row .mobui-meta{min-width: 0;}.mobui-time{display: flex;align-items: center;gap: 6px;flex-shrink: 0;font: 500 12px/14px var(--mu-mono);color: #fff;white-space: nowrap;}body.mobui .card.mobui-card-el.card--collection .card__view{height: auto;}body.mobui .items-line.mobui-hero-source,body.mobui .items-line.mobui-hidden-line{display: none !important;}body.mobui .mobui-line--wide .card__icons{display: none !important;}body.mobui .mobui-line--wide .card.mobui-card-el{width: 240px !important;}body.mobui .mobui-line--wide .card.mobui-card-el .card__view{height: 136px;}.mobui-wide-img{position: absolute;inset: 0;width: 100%;height: 100%;object-fit: cover;border-radius: 12px;z-index: 1;opacity: 0;transition: opacity 0.25s;}.mobui-wide-img.loaded{opacity: 1;}body.mobui .mobui-line--wide .card__img{opacity: 0;}.mobui-wide-logo{position: absolute;left: 50%;top: 50%;max-width: 196px;max-height: 40px;width: auto;height: auto;object-fit: contain;transform: translate(-50%,-50%);z-index: 2;opacity: 0;pointer-events: none;transition: opacity 0.25s;}.mobui-wide-logo.loaded{opacity: 1;}.mobui-wide-logo{z-index: 3;}.mobui-wide-logo.mobui-wide-logo--light{-webkit-filter: brightness(0) invert(1);filter: brightness(0) invert(1);}.mobui-line--wide .mobui-has-progress .mobui-card__rating{bottom: 22px;}.mobui-wide-watch{position: absolute;right: 12px;bottom: 25px;z-index: 3;display: flex;align-items: center;gap: 4px;}.mobui-wide-watch--series{bottom: 11px;gap: 8px;}.mobui-wide-watch svg{width: 16px;height: 16px;}.mobui-wide-watch__text{display: flex;align-items: center;gap: 6px;font: 500 12px/14px var(--mu-mono);color: #fff;white-space: nowrap;}.mobui-progress{position: absolute;left: 8px;right: 8px;bottom: 8px;height: 4px;border-radius: 4px;background: rgba(255,255,255,0.24);-webkit-backdrop-filter: blur(8px);backdrop-filter: blur(8px);overflow: hidden;z-index: 2;}.mobui-progress>div{height: 100%;background: #fff;border-radius: 4px;}.mobui-title-row{display: flex;align-items: center;justify-content: space-between;gap: 8px;}.mobui-title-row .card__title{-webkit-line-clamp: 1 !important;min-width: 0;}.mobui-episode{display: flex;align-items: center;gap: 8px;flex-shrink: 0;}.mobui-episode svg{width: 16px;height: 16px;}.mobui-episode__text,.mobui-notice__episode{display: flex;align-items: center;gap: 6px;font: 500 12px/14px var(--mu-mono);color: #fff;white-space: nowrap;}.mobui-hero{margin-bottom: 38px;}.mobui-hero{overflow: hidden;}.mobui-hero__track{display: flex;touch-action: pan-y;transition: transform 0.45s cubic-bezier(0.22,0.61,0.36,1);will-change: transform;}.mobui-hero__track.dragging{transition: none;}.mobui-hero__slide{flex: 0 0 100%;box-sizing: border-box;padding: 0 24px 24px;}.mobui-hero__poster{position: relative;width: 100%;aspect-ratio: 354 / 532;border-radius: 24px;background: rgba(255,255,255,0.06);}.mobui-hero__shadow{position: absolute;left: 16px;right: 16px;bottom: 4px;height: 31.2%;border-radius: 16px;background: #d9d9d9;box-shadow: 0 8px 24px rgba(0,0,0,0.56);z-index: -1;pointer-events: none;}.mobui-hero__poster>img{position: absolute;inset: 0;width: 100%;height: 100%;object-fit: cover;border-radius: 24px;}.mobui-hero__poster::after{content: '';position: absolute;inset: 0;border-radius: 24px;box-shadow: inset 0 2px 4px rgba(255,255,255,0.2),inset 0 4px 16px rgba(0,0,0,0.08);pointer-events: none;}.mobui-hero__poster::before{content: '';position: absolute;inset: 0;z-index: 1;border-radius: 24px;border: 1px solid rgba(255,255,255,0.48);mix-blend-mode: overlay;pointer-events: none;}.mobui-hero__badges{position: absolute;left: 20px;top: 20px;display: flex;gap: 8px;z-index: 2;}.mobui-hero__rating{position: absolute;right: 20px;top: 20px;z-index: 2;}.mobui-hero__bottom{position: absolute;left: 20px;right: 20px;bottom: 20px;display: flex;align-items: center;justify-content: space-between;z-index: 2;}.mobui-hero__watch{width: 180px;box-sizing: border-box;padding: 14px 24px;}.mobui-hero__watch svg{width: 10px;height: 16px;}.mobui-hero__actions{display: flex;align-items: center;gap: 8px;padding: 5px;border-radius: 999px;border: 1px solid var(--mu-glass-border);background: var(--mu-glass);-webkit-backdrop-filter: blur(14px);backdrop-filter: blur(14px);}.mobui-hero__book,.mobui-hero__add{width: 32px;height: 32px;box-sizing: border-box;border-radius: 16px;border: 1px solid transparent;display: flex;align-items: center;justify-content: center;cursor: pointer;-webkit-tap-highlight-color: transparent;transition: background 0.15s,border-color 0.15s;}.mobui-hero__book svg,.mobui-hero__add svg{width: 16px;height: 16px;}.mobui-hero__book:active,.mobui-hero__add:active{background: rgba(255,255,255,0.08);border-color: rgba(255,255,255,0.16);}.mobui-hero__book.on path{fill: #fff;}.mobui-hero__div{width: 1px;height: 16px;background: rgba(255,255,255,0.16);}.mobui-hero__pager{display: flex;align-items: center;gap: 12px;width: max-content;margin: 0 auto;padding: 8px 13px;border-radius: 999px;border: 1px solid var(--mu-glass-border);background: var(--mu-glass);-webkit-backdrop-filter: blur(14px);backdrop-filter: blur(14px);}.mobui-hero__dots{display: flex;align-items: center;gap: 12px;}.mobui-hero__dot{width: 6px;height: 6px;border-radius: 4px;background: rgba(255,255,255,0.48);transition: width 0.3s,background 0.3s;cursor: pointer;}.mobui-hero__dot{position: relative;overflow: hidden;}.mobui-hero__dot.active{width: 32px;}.mobui-hero__dot::after{content: '';position: absolute;left: 0;top: 0;bottom: 0;width: 0;border-radius: 4px;background: #fff;}.mobui-hero__dot.active.run::after{animation: mobui-dot-fill 7s linear forwards;}.mobui-hero.holding .mobui-hero__dot.active.run::after{animation-play-state: paused;}.mobui-hero.paused .mobui-hero__dot.active::after{width: 100%;}@keyframes mobui-dot-fill{from{width: 0;}to{width: 100%;}}.mobui-hero__pause{width: 16px;height: 16px;cursor: pointer;}.mobui-hero__pause svg{width: 16px;height: 16px;}.mobui-hero__pause svg + svg{display: none;}.mobui-hero.paused .mobui-hero__pause svg{display: none;}.mobui-hero.paused .mobui-hero__pause svg + svg{display: block;}.mobui-tabbar{position: fixed;left: 16px;right: 16px;bottom: 24px;z-index: 60;display: flex;align-items: center;gap: 8px;}.mobui-tabbar__back{display: none;flex-shrink: 0;width: 56px;height: 56px;box-sizing: border-box;border-radius: 999px;border: 1px solid var(--mu-glass-border);background: var(--mu-glass);-webkit-backdrop-filter: blur(14px);backdrop-filter: blur(14px);box-shadow: 0 8px 30px rgba(0,0,0,0.28);align-items: center;justify-content: center;cursor: pointer;}.mobui-tabbar__back svg{width: 24px;height: 24px;}.mobui-tabbar.with-back .mobui-tabbar__back{display: flex;}.mobui-tabbar__tabs{flex: 1;display: flex;padding: 3px 4px;border-radius: 999px;border: 1px solid var(--mu-glass-border);background: var(--mu-glass);-webkit-backdrop-filter: blur(14px);backdrop-filter: blur(14px);filter: drop-shadow(0 8px 15px rgba(0,0,0,0.28));}.mobui-tab{flex: 1 0 0;min-width: 0;height: 48px;border-radius: 24px;display: flex;flex-direction: column;align-items: center;justify-content: center;gap: 4px;color: var(--mu-text-2);cursor: pointer;-webkit-tap-highlight-color: transparent;transition: background 0.2s,color 0.2s;}.mobui-tab__icon svg{width: 20px;height: 20px;}.mobui-tab__label{font: 700 10px/12px var(--mu-mono);text-transform: uppercase;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;max-width: 100%;}.mobui-tab.active{background: #fff;color: var(--mu-dark);}body.player--viewing .mobui-tabbar,body.player--viewing .mobui-head,body.mobui-player-open .mobui-tabbar,body.mobui-player-open .mobui-head,body.mobui-player-open .mobui-drawer,body.mobui-player-open .mobui-sheet,body.mobui-drawer-open .mobui-tabbar,body.mobui-sheet-open .mobui-tabbar,body.settings--open .mobui-tabbar,body.selectbox--open .mobui-tabbar,body.keyboard-input--visible .mobui-tabbar{display: none;}.mobui-drawer,.mobui-sheet{position: fixed;inset: 0;z-index: 70;visibility: hidden;pointer-events: none;}.mobui-drawer.open,.mobui-sheet.open{visibility: visible;pointer-events: auto;}.mobui-drawer__scrim,.mobui-sheet__scrim{position: absolute;inset: 0;background: rgba(0,0,0,0.64);opacity: 0;transition: opacity 0.25s;}.mobui-drawer.open .mobui-drawer__scrim,.mobui-sheet.open .mobui-sheet__scrim{opacity: 1;}.mobui-drawer__panel{position: absolute;left: 0;top: 0;bottom: 0;width: 296px;max-width: 86vw;box-sizing: border-box;padding: var(--mu-safe-top) 8px calc(var(--mu-safe-bottom) + 16px);border-right: 1px solid var(--mu-glass-border);background: var(--mu-glass);-webkit-backdrop-filter: blur(32px);backdrop-filter: blur(32px);box-shadow: 0 8px 30px rgba(0,0,0,0.28);transform: translateX(-100%);transition: transform 0.25s ease;display: flex;flex-direction: column;}.mobui-drawer.open .mobui-drawer__panel{transform: none;}.mobui-drawer__body,.mobui-edit{flex: 1;min-height: 0;overflow-y: auto;-webkit-overflow-scrolling: touch;display: flex;flex-direction: column;gap: 12px;scrollbar-width: none;}.mobui-drawer__body::-webkit-scrollbar,.mobui-edit::-webkit-scrollbar{display: none;}.mobui-drawer__body>.mobui-divider{margin: 0 8px;}.mobui-profile{display: flex;align-items: center;gap: 16px;padding: 11px 8px;border-radius: 24px;}.mobui-profile__name{font: 600 16px/20px var(--mu-sans);color: #fff;}.mobui-drawer .menu{width: auto !important;padding: 0 !important;margin: 0 !important;display: flex;flex-direction: column;gap: 12px;}.mobui-drawer .menu__case{padding: 0 !important;margin: 0 !important;}.mobui-drawer .menu__list{padding: 0 !important;margin: 0 !important;list-style: none;}.mobui-drawer .menu__split{height: 1px;margin: 0 8px;padding: 0;background: rgba(255,255,255,0.08);border: 0;}.mobui-drawer .menu__item{display: flex !important;align-items: center;gap: 16px;padding: 11px 15px !important;margin: 0 !important;border: 1px solid transparent;border-radius: 16px !important;background: transparent !important;color: #fff !important;box-shadow: none !important;transform: none !important;cursor: pointer;}.mobui-drawer .menu .menu__item.hidden{display: none !important;}.mobui-drawer .menu__item.mobui-active{background: #fff !important;color: #292929 !important;}.mobui-drawer .menu__item.mobui-active .menu__text,.mobui-drawer .menu__item.mobui-active .menu__ico{color: #292929 !important;}.mobui-drawer .menu__item.mobui-active .menu__ico svg:not([viewBox=\"0 0 24 24\"]){color: #292929;}.mobui-drawer .menu__item .menu__ico [stroke]{stroke: currentColor !important;}.mobui-drawer .menu__item:not(.mobui-active):active,.mobui-drawer .menu__item.mobui-pressed:not(.mobui-active){background: rgba(255,255,255,0.08) !important;border-color: rgba(255,255,255,0.06);}.mobui-drawer .menu__ico{flex-shrink: 0;width: 24px !important;height: 24px !important;margin: 0 !important;display: flex;align-items: center;justify-content: center;}.mobui-drawer .menu__ico svg,.mobui-drawer .menu__ico img{width: 24px !important;height: 24px !important;}.mobui-drawer .menu__ico svg:not([viewBox=\"0 0 24 24\"]){width: 22px !important;height: 22px !important;color: #fff;fill: currentColor;}.mobui-drawer .menu__text{font: 500 16px/20px var(--mu-sans) !important;color: #fff !important;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;padding: 0 !important;margin: 0 !important;opacity: 1 !important;}.mobui-edit{display: none;}.mobui-drawer.editing .mobui-drawer__body{display: none;}.mobui-drawer.editing .mobui-edit{display: flex;}.mobui-edit{margin: 0 -4px;padding: 0 4px;}.mobui-edit__head{padding: 11px 16px;font: 500 20px/24px var(--mu-sans);color: #fff;}.mobui-edit__list{position: relative;}.mobui-edit-item{position: relative;height: 48px;box-sizing: border-box;padding: 12px 16px;border-radius: 16px;border: 1px solid transparent;display: flex;align-items: center;justify-content: space-between;-webkit-user-select: none;user-select: none;cursor: pointer;background: transparent;}.mobui-edit-item__content{display: flex;align-items: center;gap: 16px;min-width: 0;}.mobui-edit-item__check{width: 16px;height: 16px;flex-shrink: 0;}.mobui-edit-item__check svg{width: 17.5px;height: 17.5px;margin: -0.75px;}.mobui-edit-item__check svg + svg{display: none;}.mobui-edit-item:not(.checked) .mobui-edit-item__check svg{display: none;}.mobui-edit-item:not(.checked) .mobui-edit-item__check svg + svg{display: block;}.mobui-edit-item__main{display: flex;align-items: center;gap: 12px;min-width: 0;}.mobui-edit-item:not(.checked) .mobui-edit-item__main{opacity: 0.5;}.mobui-edit-item__icon{width: 24px;height: 24px;flex-shrink: 0;display: flex;align-items: center;justify-content: center;}.mobui-edit-item__icon svg{width: 24px;height: 24px;}.mobui-edit-item__icon svg:not([viewBox=\"0 0 24 24\"]){width: 22px;height: 22px;color: #fff;fill: currentColor;}.mobui-edit-item__name{font: 500 16px/20px var(--mu-sans);color: #fff;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}.mobui-edit-item__handle{width: 40px;height: 48px;margin: -12px -16px -12px 0;display: flex;align-items: center;justify-content: center;flex-shrink: 0;touch-action: none;cursor: grab;}.mobui-edit-item__handle svg{width: 16px;height: 16px;}.mobui-edit-item.dragging{z-index: 5;margin: 0 -4px;background: rgba(255,255,255,0.14);border-color: rgba(255,255,255,0.32);-webkit-backdrop-filter: blur(16px);backdrop-filter: blur(16px);filter: drop-shadow(0 2px 3px rgba(0,0,0,0.25)) drop-shadow(0 12px 14px rgba(0,0,0,0.45));transition: none;}.mobui-edit-item.dragging .mobui-edit-item__handle{cursor: grabbing;}.mobui-edit__buttons{display: flex;flex-shrink: 0;margin-top: 12px;padding: 0 16px 24px;gap: 16px;align-items: center;}.mobui-edit__done{width: 132px;box-sizing: border-box;}body.mobui .settings__layer{background: rgba(0,0,0,0.64) !important;}body.mobui .settings__content{top: 0 !important;bottom: 0 !important;left: auto !important;right: 0 !important;width: 296px !important;max-width: 86vw;height: 100% !important;max-height: none !important;box-sizing: border-box;padding: calc(var(--mu-safe-top) + 12px) 8px var(--mu-safe-bottom) !important;border-radius: 0 !important;border-left: 1px solid var(--mu-glass-border);background: var(--mu-glass) !important;-webkit-backdrop-filter: blur(32px);backdrop-filter: blur(32px);box-shadow: 0 8px 30px rgba(0,0,0,0.28);transform: translate3d(100%,0,0) !important;transition: transform 0.25s ease !important;-webkit-animation: none !important;animation: none !important;display: flex !important;flex-direction: column;overflow: hidden !important;}body.mobui.settings--open .settings__content{transform: translate3d(0,0,0) !important;}body.mobui .settings__head{flex-shrink: 0;}body.mobui .settings__body{flex: 1;min-height: 0;overflow: hidden;position: relative;}body.mobui .settings__body>.scroll{height: 100% !important;max-height: none !important;overflow-y: auto !important;-webkit-overflow-scrolling: touch;overscroll-behavior: contain;}body.mobui .settings__head{padding: 11px 16px !important;margin-bottom: 12px;background: transparent !important;}body.mobui .settings__title{font: 500 20px/24px var(--mu-sans) !important;color: #fff;}body.mobui .settings__body .scroll{max-height: none !important;}body.mobui .settings__body .scroll__content{padding: 0 0 24px !important;}body.mobui .settings-folder{display: flex !important;align-items: center;gap: 16px;height: 48px;box-sizing: border-box;padding: 12px 16px !important;margin: 0 !important;border-radius: 16px !important;background: transparent !important;border: 1px solid transparent;}body.mobui .settings-folder.focus,body.mobui .settings-folder.hover{background: rgba(255,255,255,0.08) !important;border-color: rgba(255,255,255,0.24);}body.mobui .settings-folder__icon{flex-shrink: 0;width: 24px !important;height: 24px !important;margin: 0 !important;display: flex;align-items: center;justify-content: center;}body.mobui .settings-folder__icon>svg,body.mobui .settings-folder__icon>img{width: 22px !important;height: 22px !important;}body.mobui .settings-folder__icon>svg[width=\"24\"]{width: 24px !important;height: 24px !important;}body.mobui .settings-folder__name{flex: 1;min-width: 0;font: 500 16px/20px var(--mu-sans) !important;color: #fff !important;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}body.mobui .settings-folder .mobui-chevron{flex-shrink: 0;}.mobui-settings-divider{margin: 12px 8px;}body.mobui .settings-param,body.mobui .settings-param-title{padding-left: 16px !important;padding-right: 16px !important;border-radius: 16px !important;}body.mobui .settings-param__name{font: 500 16px/20px var(--mu-sans) !important;}body.mobui .settings-param__value{font: 500 12px/16px var(--mu-mono) !important;color: var(--mu-text-2) !important;}body.mobui .settings-param__descr{font: 400 12px/18px var(--mu-sans) !important;color: var(--mu-text-2) !important;}body.mobui .settings-param-title>span{font: 500 12px/16px var(--mu-mono) !important;text-transform: uppercase;color: var(--mu-text-3) !important;}body.mobui .settings-param.focus,body.mobui .settings-param.hover{background: rgba(255,255,255,0.08) !important;}body.mobui .main-search{background: transparent !important;z-index: 30;}body.mobui.search--open .wrap,body.mobui.search--open .head{display: none !important;}body.mobui .main-search>.scroll>.scroll__content{padding: calc(var(--mu-safe-top) + 8px) 0 calc(112px + var(--mu-safe-bottom)) !important;}body.mobui .main-search .head-backward{padding: 16px 24px 16px !important;margin: 0 !important;background: transparent !important;height: auto;display: block !important;}body.mobui .main-search .head-backward__button{display: none !important;}body.mobui .main-search .head-backward__title{font: 400 24px/32px var(--mu-sans) !important;color: #fff;text-align: left !important;padding: 0 !important;margin: 0 !important;}body.mobui .search__body{padding: 0 !important;display: flex;flex-direction: column;gap: 24px;margin-top: 16px;}body.mobui .search__body>div:empty{display: none;}body.mobui .search__input{display: none !important;}body.mobui .search__keypad{padding: 0 24px !important;margin: 0 !important;}body.mobui .search__keypad .simple-keyboard{padding: 0 !important;background: none !important;}body.mobui .main-search .simple-keyboard-buttons{display: none !important;}.mobui-search-field{display: flex;align-items: center;gap: 12px;padding: 11px 16px;border-radius: 16px;border: 1px solid rgba(255,255,255,0.16);background: rgba(255,255,255,0.08);-webkit-backdrop-filter: blur(16px);backdrop-filter: blur(16px);}.mobui-search-field__icon,.mobui-search-field__icon svg{width: 20px;height: 20px;flex-shrink: 0;}body.mobui .mobui-search-field .simple-keyboard-input{flex: 1;min-width: 0;height: 24px !important;padding: 0 !important;margin: 0 !important;border: 0 !important;border-radius: 0 !important;background: transparent !important;box-shadow: none !important;outline: none;font: 400 16px/24px var(--mu-sans) !important;color: #fff !important;}body.mobui .mobui-search-field .simple-keyboard-input::placeholder{color: var(--mu-text-3);opacity: 1;}.mobui-search-field__clear{display: none;width: 24px;height: 24px;flex-shrink: 0;border-radius: 999px;background: rgba(255,255,255,0.12);align-items: center;justify-content: center;cursor: pointer;}.mobui-search-field__clear svg{width: 16px;height: 16px;}.mobui-search-field.filled .mobui-search-field__clear{display: flex;}body.mobui .search__history,body.mobui .search__sources{padding: 0 !important;margin: 0 !important;}body.mobui .search__history .scroll__body,body.mobui .search__sources .scroll__body{display: flex;gap: 8px;padding: 0 24px !important;width: max-content;}body.mobui .search__history .scroll,body.mobui .search__sources .scroll,body.mobui .search__history .scroll__content,body.mobui .search__sources .scroll__content{padding: 0 !important;}body.mobui .search-history-empty{display: none !important;}body.mobui .search-history-key{margin: 0 !important;padding: 8px 14px 8px 12px !important;border-radius: 12px !important;border: 1px solid rgba(255,255,255,0.16);background: rgba(255,255,255,0.08) !important;-webkit-backdrop-filter: blur(16px);backdrop-filter: blur(16px);color: #fff !important;}body.mobui .search-history-key>div{display: flex;align-items: center;gap: 8px;font: 400 14px/20px var(--mu-sans) !important;padding: 0 !important;}body.mobui .search-history-key::before,body.mobui .search-history-key>div::before{display: none !important;}.mobui-clock svg{width: 16px;height: 16px;}body.mobui .search-history-key.focus,body.mobui .search-history-key.hover{background: rgba(255,255,255,0.16) !important;}body.mobui .search-source{display: flex !important;align-items: center;gap: 8px;margin: 0 !important;padding: 7px 16px !important;height: 34px !important;min-height: 0 !important;box-sizing: border-box;border-radius: 999px !important;border: 1px solid rgba(255,255,255,0.16);background: rgba(255,255,255,0.08) !important;-webkit-backdrop-filter: blur(16px);backdrop-filter: blur(16px);color: var(--mu-text-2) !important;}body.mobui .search-source__tab{font: 500 12px/16px var(--mu-mono) !important;text-transform: uppercase;color: inherit !important;white-space: nowrap;}body.mobui .search-source__count{margin: 0 -10px 0 0 !important;line-height: 16px !important;padding: 2px 8px !important;min-width: 0;height: auto;border-radius: 999px !important;background: rgba(255,255,255,0.12) !important;font: 500 12px/16px var(--mu-mono) !important;color: #fff !important;}body.mobui .search-source__count.mobui-empty{display: none !important;}body.mobui .search-source.active{background: #fff !important;border-color: #fff;color: var(--mu-dark) !important;}body.mobui .search-source.active .search-source__count{background: var(--mu-dark) !important;color: #fff !important;}body.mobui .search__results{padding: 0 !important;margin: 0 !important;}body.mobui .search__results .items-line{padding-bottom: 40px;}body.mobui .search-looking,body.mobui .search__results .broadcast__text{padding: 0 24px !important;font: 400 14px/20px var(--mu-sans) !important;color: var(--mu-text-2) !important;}.mobui-sheet__surface{position: absolute;left: 0;right: 0;bottom: 0;height: calc(100% - 328px);min-height: 60%;max-height: 100%;box-sizing: border-box;border-radius: 32px 32px 0 0;border: 1px solid var(--mu-glass-border);border-bottom: 0;background: var(--mu-glass);-webkit-backdrop-filter: blur(32px);backdrop-filter: blur(32px);box-shadow: 0 0 24px rgba(0,0,0,0.32);transform: translateY(100%);transition: transform 0.3s ease;display: flex;flex-direction: column;}.mobui-sheet.open .mobui-sheet__surface{transform: none;}.mobui-sheet__head{flex-shrink: 0;display: flex;align-items: center;justify-content: space-between;padding: 18px 16px 18px 24px;}.mobui-sheet__title{font: 400 24px/32px var(--mu-sans);color: #fff;}.mobui-sheet__close{width: 44px;height: 44px;box-sizing: border-box;border-radius: 999px;border: 1px solid rgba(255,255,255,0.06);background: rgba(255,255,255,0.08);-webkit-backdrop-filter: blur(16px);backdrop-filter: blur(16px);display: flex;align-items: center;justify-content: center;cursor: pointer;}.mobui-sheet__close svg{width: 24px;height: 24px;}.mobui-sheet__list{flex: 1;min-height: 0;overflow-y: auto;-webkit-overflow-scrolling: touch;padding: 0 24px calc(24px + var(--mu-safe-bottom));display: flex;flex-direction: column;gap: 16px;}.mobui-sheet__empty{padding: 24px 0;font: 400 14px/20px var(--mu-sans);color: var(--mu-text-2);}.mobui-notice{display: flex;gap: 16px;align-items: stretch;cursor: pointer;}.mobui-notice__poster{position: relative;flex-shrink: 0;width: 96px;height: 144px;box-sizing: border-box;padding: 4px;border-radius: 8px;border: 0;box-shadow: 0 4px 8px rgba(0,0,0,0.24);background: rgba(255,255,255,0.06);display: flex;flex-direction: column;justify-content: flex-end;align-items: flex-start;overflow: hidden;isolation: isolate;}.mobui-notice__poster img{position: absolute;inset: 0;width: 100%;height: 100%;object-fit: cover;border-radius: 8px;}.mobui-notice__poster::after{content: '';position: absolute;inset: 0;border-radius: inherit;pointer-events: none;border: 1px solid rgba(255,255,255,0.16);mix-blend-mode: overlay;}.mobui-notice__poster::before{content: '';position: absolute;inset: 0;z-index: 1;border-radius: inherit;pointer-events: none;box-shadow: inset 0 2px 2px rgba(255,255,255,0.16),inset 0 4px 16px rgba(0,0,0,0.08);}.mobui-notice__poster img{z-index: 0;}.mobui-notice__poster::after{z-index: 2;}.mobui-notice__poster .mobui-rating{position: relative;z-index: 3;}.mobui-notice__info{flex: 1;min-width: 0;display: flex;flex-direction: column;gap: 12px;}.mobui-notice__top{display: flex;align-items: center;justify-content: space-between;gap: 8px;}.mobui-notice__badges{display: flex;gap: 4px;}.mobui-notice__date{font: 500 12px/14px var(--mu-mono);color: var(--mu-text-3);text-transform: uppercase;white-space: nowrap;}.mobui-notice__content{flex: 1;min-height: 0;display: flex;flex-direction: column;gap: 12px;}.mobui-notice__title{font: 400 20px/24px var(--mu-sans);color: #fff;}.mobui-notice__descr{font: 400 12px/18px var(--mu-sans);color: var(--mu-text-2);overflow: hidden;display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;}.mobui-notice__descr .notice__footer{display: none;}body.mobui .player-info{padding-top: var(--mu-safe-top) !important;}body.mobui .player-panel{padding-bottom: var(--mu-safe-bottom) !important;}body.mobui .selectbox__content,body.mobui .modal__content{padding-bottom: var(--mu-safe-bottom);}.mobui-diag{position: fixed;left: 16px;right: 16px;top: 40%;z-index: 9999;margin: 0;padding: 12px;border-radius: 12px;background: rgba(0,0,0,0.85);color: #7CFC9A;font: 500 11px/16px var(--mu-mono);white-space: pre-wrap;word-break: break-all;}.mobui-toast{position: fixed;left: 16px;right: 16px;bottom: 96px;z-index: 61;display: flex;align-items: center;gap: 8px;padding: 6px 16px 6px 8px;box-sizing: border-box;border-radius: 999px;border: 1px solid var(--mu-glass-border);background: var(--mu-glass);-webkit-backdrop-filter: blur(14px);backdrop-filter: blur(14px);filter: drop-shadow(0 8px 15px rgba(0,0,0,0.28));color: #fff;font-size: 15px;line-height: 20px;opacity: 0;transform: translateY(12px);pointer-events: none;transition: opacity 0.25s,transform 0.25s;}.mobui-toast.show{opacity: 1;transform: none;pointer-events: auto;}.mobui-toast svg{width: 40px;height: 40px;flex-shrink: 0;}.mobui-toast__text{min-width: 0;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}body.mobui-sheet-open .mobui-toast,body.player--viewing .mobui-toast,body.mobui-player-open .mobui-toast{display: none;}body.mobui .selectbox__layer{background: rgba(0,0,0,0.64);-webkit-backdrop-filter: none !important;backdrop-filter: none !important;}body.mobui .selectbox__content{left: 0 !important;right: 0 !important;width: auto !important;box-sizing: border-box;max-height: calc(100% - var(--mu-safe-top) - 64px);border-radius: 32px 32px 0 0 !important;border: 1px solid var(--mu-glass-border);border-bottom: 0;background: var(--mu-glass) !important;-webkit-backdrop-filter: blur(32px);backdrop-filter: blur(32px);box-shadow: 0 0 24px rgba(0,0,0,0.32);padding-bottom: calc(16px + var(--mu-safe-bottom));font-size: 16px;}body.mobui .selectbox__head{display: flex;align-items: center;justify-content: space-between;gap: 16px;padding: 18px 16px 18px 24px !important;}body.mobui .selectbox__title{font: 400 24px/32px var(--mu-sans) !important;color: #fff;min-width: 0;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}body.mobui .selectbox__head .mobui-sheet__close{flex-shrink: 0;}body.mobui .selectbox-item{margin: 0 8px;padding: 12px 16px !important;border-radius: 16px;border: 1px solid transparent;background: transparent !important;color: #fff !important;transform: none !important;}body.mobui .selectbox-item.focus,body.mobui .selectbox-item:active{background: rgba(255,255,255,0.08) !important;border-color: rgba(255,255,255,0.06);color: #fff !important;}body.mobui .selectbox-item__title{font: 400 16px/20px var(--mu-sans) !important;color: #fff !important;}body.mobui .selectbox-item__subtitle{margin-top: 4px !important;font: 400 12px/18px var(--mu-sans) !important;color: var(--mu-text-2) !important;opacity: 1 !important;}body.mobui .selectbox-item--checkbox{padding-right: 48px !important;}body.mobui .selectbox-item__checkbox{top: 50% !important;right: 16px !important;width: 16px !important;height: 16px !important;margin-top: -8px;box-sizing: border-box;border: 1.5px solid rgba(255,255,255,0.48) !important;border-radius: 4px !important;background: transparent !important;}body.mobui .selectbox-item--checked .selectbox-item__checkbox{border-color: #fff !important;}body.mobui .selectbox-item--checked .selectbox-item__checkbox::after{content: '' !important;position: absolute;left: 4px !important;top: 1.5px !important;width: 4px !important;height: 7px !important;border: solid #fff !important;border-width: 0 2px 2px 0 !important;background: none !important;transform: rotate(45deg) !important;}body.mobui .selectbox-item__lock{right: 16px !important;margin-top: -10px !important;opacity: 0.48 !important;}body.mobui .selectbox-item__lock>svg{width: 20px !important;height: 20px !important;}body.mobui .selectbox .settings-param-title{padding: 16px 24px 8px !important;margin: 0 !important;}body.mobui .selectbox .settings-param-title>span{font: 500 12px/14px var(--mu-mono) !important;color: var(--mu-text-3) !important;text-transform: uppercase;letter-spacing: 0;}body.mobui .card .card__view{transition: transform 0.25s ease,box-shadow 0.25s ease !important;}body.mobui .card.mobui-press .card__view,body.mobui .card.mobui-card-el.mobui-press .card__view{transform: scale(1.04) !important;box-shadow: 0 8px 16px rgba(0,0,0,0.48) !important;z-index: 2;}body.mobui .items-line .scroll--horizontal{padding-top: 16px !important;padding-bottom: 24px !important;margin-top: -16px !important;margin-bottom: -24px !important;}body.mobui .selectbox .scroll__content{padding: 0 0 8px !important;}body.mobui .selectbox .scroll--mask{-webkit-mask-image: none !important;mask-image: none !important;}";

    /* ------------------------------------------------------------------ */
    /* Утилиты                                                             */
    /* ------------------------------------------------------------------ */

    var I18N = {
        ru: { movie: 'Фильм', series: 'Сериал', watch: 'Смотреть', more: 'Ещё', edit_menu: 'Редактировать меню', reset: 'Сбросить', done: 'Готово', notifications: 'Уведомления', search_placeholder: 'Фильмы, сериалы, люди', profile: 'Профиль', profile_name: 'Имя в меню', profile_name_descr: 'Отображается в шапке бокового меню', translucent: 'Прозрачный статус-бар (эксперимент)', translucent_descr: 'В приложении с экрана «Домой» работает нестабильно. Применяется после перезапуска', diag: 'Диагностика экрана', diag_descr: 'Показывает размеры окна. Тап по блоку — обновить', fill: 'Тест: сплошной фон', fill_descr: 'Заливает фон ярким цветом. Если затемнение сверху остаётся — его рисует iOS', clear: 'Тест: прозрачный фон страницы', clear_descr: 'Убирает цвет фона страницы, из которого iOS рисует затемнение сверху', quality: 'Качество на постерах', quality_descr: 'Alloha, затем торренты (JacRed)', alloha: 'Токен Alloha', alloha_descr: 'Для качества на постерах. Без токена — JacRed', feed_movie: 'Вышел в качестве', feed_series: 'Новый сериал в качестве', feed_episode: 'Новая серия', feed_episodes: 'Новые серии', feed_many: 'Новых уведомлений', feed_empty: 'Пока ничего нового', feed_continue: 'Продолжить' },
        uk: { movie: 'Фільм', series: 'Серіал', watch: 'Дивитися', more: 'Ще', edit_menu: 'Редагувати меню', reset: 'Скинути', done: 'Готово', notifications: 'Сповіщення', search_placeholder: 'Фільми, серіали, люди', profile: 'Профіль', profile_name: "Ім'я в меню", profile_name_descr: 'Відображається у шапці бічного меню', translucent: 'Прозорий статус-бар (експеримент)', translucent_descr: 'У застосунку з екрана «Додому» працює нестабільно. Діє після перезапуску', diag: 'Діагностика екрана', diag_descr: 'Показує розміри вікна. Тап по блоку — оновити', fill: 'Тест: суцільний фон', fill_descr: 'Заливає фон яскравим кольором. Якщо затемнення зверху лишається — його малює iOS', clear: 'Тест: прозорий фон сторінки', clear_descr: 'Прибирає колір фону сторінки, з якого iOS малює затемнення зверху', quality: 'Якість на постерах', quality_descr: 'Alloha, потім торренти (JacRed)', alloha: 'Токен Alloha', alloha_descr: 'Для якості на постерах. Без токена — JacRed', feed_movie: 'Вийшов у якості', feed_series: 'Новий серіал у якості', feed_episode: 'Нова серія', feed_episodes: 'Нові серії', feed_many: 'Нових сповіщень', feed_empty: 'Поки нічого нового', feed_continue: 'Продовжити' },
        en: { movie: 'Movie', series: 'Series', watch: 'Watch', more: 'More', edit_menu: 'Edit Menu', reset: 'Reset', done: 'Done', notifications: 'Notifications', search_placeholder: 'Movies, series, people', profile: 'Profile', profile_name: 'Menu name', profile_name_descr: 'Shown at the top of the side menu', translucent: 'Transparent status bar (experimental)', translucent_descr: 'Unstable in the Home Screen app. Applies after restart', diag: 'Screen diagnostics', diag_descr: 'Shows window sizes. Tap the box to refresh', fill: 'Test: solid background', fill_descr: 'Fills the background with a bright color. If the top shade stays, iOS draws it', clear: 'Test: transparent page background', clear_descr: 'Removes the page background color iOS uses for the top shade', quality: 'Quality on posters', quality_descr: 'Alloha, then torrents (JacRed)', alloha: 'Alloha token', alloha_descr: 'For poster quality. Without it — JacRed', feed_movie: 'Out in', feed_series: 'New series in', feed_episode: 'New episode', feed_episodes: 'New episodes', feed_many: 'New notifications', feed_empty: 'Nothing new yet', feed_continue: 'Continue' }
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
            this.el = $('<div class="mobui-bg"><canvas class="mobui-bg__img"></canvas><div class="mobui-bg__overlay"></div></div>');
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
        draw: function () {
            var img = this.image;
            if (!img || !this.el) return;

            var canvas = this.el.find('.mobui-bg__img')[0];
            var box = canvas.getBoundingClientRect();
            var bw = box.width || window.innerWidth;
            var bh = box.height || window.innerHeight;

            // Как background-size: cover и позиция center top
            var iw = img.naturalWidth, ih = img.naturalHeight;
            if (!iw || !ih) return;
            var scale = Math.max(bw / iw, bh / ih);
            var sw = bw / scale, sh = bh / scale;
            var sx = (iw - sw) / 2, sy = 0;

            // Уменьшение до ~1/32 ширины ≈ blur(32px), затем плавное увеличение
            var small = document.createElement('canvas');
            small.width = Math.max(4, Math.round(bw / 32));
            small.height = Math.max(4, Math.round(bh / 32));

            try {
                var sc = small.getContext('2d');
                sc.imageSmoothingEnabled = true;
                sc.drawImage(img, sx, sy, sw, sh, 0, 0, small.width, small.height);

                canvas.width = small.width * 8;
                canvas.height = small.height * 8;
                var c = canvas.getContext('2d');
                c.imageSmoothingEnabled = true;
                try { c.imageSmoothingQuality = 'high'; } catch (e) { }
                c.drawImage(small, 0, 0, canvas.width, canvas.height);

                $(canvas).addClass('ready');
            } catch (e) { }

            this.tint(small);
        },

        // iOS рисует под статус-баром градиент цветом фона страницы (html/body), поверх
        // шапки. Убрать его нельзя, но можно сделать его того же цвета, что и фон под ним:
        // берём средний цвет верхней полосы размытой картинки с учётом затемнения 64%
        tint: function (small) {
            var color = StatusBar.color;
            try {
                var rows = Math.max(1, Math.round(small.height * 0.12));
                var data = small.getContext('2d').getImageData(0, 0, small.width, rows).data;
                var r = 0, g = 0, b = 0, n = 0;
                for (var i = 0; i < data.length; i += 4) { r += data[i]; g += data[i + 1]; b += data[i + 2]; n++; }
                var k = 0.36 / n;
                color = 'rgb(' + Math.round(r * k) + ',' + Math.round(g * k) + ',' + Math.round(b * k) + ')';
            } catch (e) { }

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
            var head = $('.selectbox__head').eq(0);
            if (!head.length || head.find('.mobui-sheet__close').length) return;
            var btn = $('<div class="mobui-sheet__close">' + icon('close') + '</div>');
            head.append(btn);
            onTap(btn, function () { try { Lampa.Select.close(); } catch (e) { } });
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

        var parts = [TapGuard, CardPress, SelectBox, Bg, Header, Notify, TabBar, Drawer, Quality, Feed, Cards, Hero, Settings, Search];

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
