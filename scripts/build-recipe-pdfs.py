import json
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen.canvas import Canvas
from reportlab.platypus import Paragraph

ROOT = Path(__file__).resolve().parents[1]
pdfmetrics.registerFont(TTFont('Georgia', 'C:/Windows/Fonts/georgia.ttf'))
pdfmetrics.registerFont(TTFont('Arial', 'C:/Windows/Fonts/arial.ttf'))
pdfmetrics.registerFont(TTFont('Arial-Bold', 'C:/Windows/Fonts/arialbd.ttf'))

INK = colors.HexColor('#203629')
MUTED = colors.HexColor('#52665a')
PAPER = colors.HexColor('#faf7ed')
LINE = colors.HexColor('#b9c3b4')
styles = {
    'title': ParagraphStyle('title', fontName='Georgia', fontSize=34, leading=38, textColor=INK),
    'summary': ParagraphStyle('summary', fontName='Arial', fontSize=10.5, leading=15, textColor=MUTED),
    'body': ParagraphStyle('body', fontName='Arial', fontSize=10, leading=14, textColor=INK),
    'note': ParagraphStyle('note', fontName='Arial', fontSize=8.5, leading=12, textColor=MUTED),
}


def paragraph(canvas, value, x, top, width, style):
    block = Paragraph(value, style)
    _, height = block.wrap(width, 1000)
    block.drawOn(canvas, x, top - height)
    return top - height


def photo(canvas, path, x, y, width, height):
    image = ImageReader(path)
    iw, ih = image.getSize()
    scale = max(width / iw, height / ih)
    canvas.saveState()
    clip = canvas.beginPath()
    clip.rect(x, y, width, height)
    canvas.clipPath(clip, stroke=0)
    canvas.drawImage(image, x + (width - iw * scale) / 2, y + (height - ih * scale) / 2, iw * scale, ih * scale)
    canvas.restoreState()


def build(recipe):
    target = ROOT / 'public' / 'recipes' / f"{recipe['slug']}.pdf"
    target.parent.mkdir(parents=True, exist_ok=True)
    canvas = Canvas(str(target), pagesize=(595.28, 841.89), pageCompression=1)
    canvas.setTitle(f"{recipe['name']} | Dubai Vegan Community")
    canvas.setAuthor('Dubai Vegan Community')
    canvas.setFillColor(PAPER)
    canvas.rect(0, 0, 595.28, 841.89, fill=1, stroke=0)
    canvas.setFillColor(INK)
    canvas.setFont('Arial-Bold', 9)
    canvas.drawString(40, 804, 'DUBAI VEGAN COMMUNITY')
    canvas.setFont('Arial', 9)
    canvas.drawRightString(555, 804, 'Recipe book')
    canvas.setStrokeColor(LINE)
    canvas.line(40, 792, 555, 792)

    photo(canvas, ROOT / 'public' / 'assets' / recipe['image'], 350, 585, 205, 185)
    title_bottom = paragraph(canvas, recipe['name'], 40, 754, 285, styles['title'])
    summary_bottom = paragraph(canvas, recipe['summary'], 40, title_bottom - 14, 270, styles['summary'])
    canvas.setFont('Arial-Bold', 9)
    canvas.drawString(40, min(summary_bottom - 26, 612), recipe['time'].upper())

    canvas.setStrokeColor(INK)
    canvas.line(40, 560, 555, 560)
    canvas.setFont('Georgia', 21)
    canvas.drawString(40, 532, 'Ingredients')
    canvas.drawString(280, 532, 'Method')
    left, right = 510, 510
    for ingredient in recipe['ingredients']:
        left = paragraph(canvas, ingredient, 40, left, 210, styles['body']) - 8
        canvas.setStrokeColor(LINE)
        canvas.line(40, left + 4, 250, left + 4)
    for step in recipe['method']:
        right = paragraph(canvas, step, 280, right, 275, styles['body']) - 14
        canvas.setStrokeColor(LINE)
        canvas.line(280, right + 7, 555, right + 7)
    if recipe.get('note'):
        left = paragraph(canvas, recipe['note'], 40, left - 18, 210, styles['note'])
    if min(left, right) < 67:
        raise ValueError(f"{recipe['slug']} overflows page: {left:.1f}, {right:.1f}")
    canvas.setStrokeColor(LINE)
    canvas.line(40, 50, 555, 50)
    canvas.setFont('Arial', 8)
    canvas.setFillColor(MUTED)
    canvas.drawString(40, 35, 'dubai-vegan-community.vercel.app/recipes.html')
    canvas.drawRightString(555, 35, 'From the community recipe book')
    canvas.save()
    return target


if __name__ == '__main__':
    recipes = json.loads((ROOT / 'src' / 'data' / 'recipes.json').read_text(encoding='utf-8'))
    for recipe in recipes:
        print(build(recipe))
