print("Скрипт запущен!")
import os
from rembg import remove
from PIL import Image

input_dir = 'img'
output_dir = 'img/transparent'
os.makedirs(output_dir, exist_ok=True)

files = [f for f in os.listdir(input_dir) if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
print(f'Найдено файлов для обработки: {len(files)}')

for fname in files:
    try:
        input_path = os.path.join(input_dir, fname)
        output_path = os.path.join(output_dir, fname.rsplit('.', 1)[0] + '_no_bg.png')
        with open(input_path, 'rb') as inp:
            img = Image.open(inp)
            img = img.convert('RGBA')
            out = remove(img)
            out.save(output_path)
        print(f'Обработано: {fname}')
    except Exception as e:
        print(f'Ошибка при обработке {fname}: {e}')