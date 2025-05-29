
from PIL import Image,ImageDraw
import os

# Fonction pour générer les images redimensionnées
def generate_images(source_image_path, output_dir, sizes):
    # Ouvre l'image source
    with Image.open(source_image_path) as img:
        # Crée le dossier de sortie s'il n'existe pas
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)
        
        # Génère chaque taille spécifiée
        for size in sizes:
            # Redimensionne l'image
            resized_img = img.resize((size, size), Image.LANCZOS)
            
            # Crée le chemin du fichier de sortie
            filename = f"{output_dir}/icon_{size}x{size}.png"
            
            # Sauvegarde l'image redimensionnée
            resized_img.save(filename)
            print(f"Image générée : {filename}")
# Sauvegarde en favicon.ico avec plusieurs tailles
def save_as_favicon(output_dir, rounded=False):
    icons = []
    for size in sizes:
        icons.append(f"{output_dir}/icon_{size}x{size}.png")
    effem_path = f"{output_dir}/icon_rounded.png"
    # Crée un fichier .ico
    img = Image.open(icons[0])
    size,_ = img.size
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    if rounded:
        # Applique un masque rond à l'image
        mask = Image.new('L', (size, size), 0)
        draw = ImageDraw.Draw(mask)
        draw.ellipse((0, 0, size, size), fill=255)
        
        # Applique le masque rond
        img.putalpha(mask)
        img.save(effem_path)  # Sauvegarde l'image modifiée
        img2 = Image.open(effem_path)
        img2.save(f"{output_dir}/favicon.ico", format="ICO", sizes=[(size, size) for size in sizes])
    else:
        img.save(f"{output_dir}/favicon.ico", format="ICO", sizes=[(size, size) for size in sizes])


# Liste des tailles d'icônes que tu veux générer
sizes = [16, 32, 48, 64, 128, 192, 256, 512]

# Chemin de l'image source
source_image_path = 'woman_hero.png'

# Dossier de sortie pour les icônes générées
output_dir = 'manifest_icons'

# Appelle la fonction pour générer les images
generate_images(source_image_path, output_dir, sizes)
# Appeler cette fonction après avoir généré les images
save_as_favicon(output_dir,True)