import requests

url = "https://cdn.freesound.org/previews/403/403008_5121236-lq.mp3"
filename = input("Nom du fichier à enregistrer (avec extension, ex: goutte.mp3) : ").strip()

if not filename:
    print("Nom de fichier invalide.")
else:
    try:
        print("Téléchargement en cours...")
        response = requests.get(url, stream=True)
        response.raise_for_status()
        with open(filename, "wb") as f:
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:
                    f.write(chunk)
        print(f"Téléchargement terminé : {filename}")
    except Exception as e:
        print(f"Erreur lors du téléchargement : {e}")