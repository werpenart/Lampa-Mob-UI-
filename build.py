#!/usr/bin/env python3
"""Собирает mob-ui.js из src/: иконки (SVG из Figma) + стили + код."""
import json
import os
import re

ROOT = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(ROOT, 'src')

# Иконки, у которых цвет задаётся из CSS (активное/неактивное состояние)
CURRENT_COLOR = ('tab-', 'm-')


def clean_svg(name, svg):
    svg = re.sub(r'\s(preserveAspectRatio|overflow|style)="[^"]*"', '', svg)
    # id нужны только маскам (на них ссылается mask="url(#...)"), остальные убираем
    svg = re.sub(r'<(?!mask\b)([a-zA-Z]+)([^>]*?)\sid="[^"]*"', r'<\1\2', svg)
    svg = re.sub(r'\sclip-path="[^"]*"', '', svg)
    svg = re.sub(r'<defs>.*?</defs>', '', svg, flags=re.S)
    svg = re.sub(r'>\s+<', '><', svg.strip())
    if name.startswith(CURRENT_COLOR):
        svg = re.sub(r'stroke="(white|#292929)"', 'stroke="currentColor"', svg)
        svg = re.sub(r'\sstroke-opacity="[^"]*"', '', svg)
    return svg


def main():
    icons = {}
    icon_dir = os.path.join(SRC, 'icons')
    for f in sorted(os.listdir(icon_dir)):
        if f.endswith('.svg'):
            name = f[:-4]
            with open(os.path.join(icon_dir, f), encoding='utf-8') as fh:
                icons[name] = clean_svg(name, fh.read())

    with open(os.path.join(SRC, 'style.css'), encoding='utf-8') as fh:
        css = fh.read()
    css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
    css = re.sub(r'\s+', ' ', css)
    css = re.sub(r'\s*([{};,>])\s*', r'\1', css).strip()

    with open(os.path.join(SRC, 'main.js'), encoding='utf-8') as fh:
        js = fh.read()

    js = js.replace('/*@ICONS@*/{}', json.dumps(icons, ensure_ascii=False))
    js = js.replace("/*@CSS@*/''", json.dumps(css, ensure_ascii=False))

    with open(os.path.join(ROOT, 'mob-ui.js'), 'w', encoding='utf-8') as fh:
        fh.write(js)
    print('mob-ui.js: %d bytes, %d icons' % (len(js), len(icons)))


if __name__ == '__main__':
    main()
