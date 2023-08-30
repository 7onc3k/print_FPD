import os
import pyperclip
from functools import reduce


def get_directory_structure(rootdir):
    """
    Vytváří rekurzivní výpis struktury adresáře
    """
    directory_structure = {}
    
    for dirpath, dirnames, filenames in os.walk(rootdir):
        relative_path = os.path.relpath(dirpath, rootdir)
        if relative_path == ".":
            current_level = directory_structure
        else:
            parts = relative_path.split(os.sep)
            current_level = directory_structure
            for part in parts:
                current_level = current_level.setdefault(part, {})
        
        for filename in filenames:
            current_level[filename] = None

    return directory_structure
def dict_to_string(d, indent=0):
    """
    Konvertuje slovník struktury adresáře na řetězec s odsazením
    """
    lines = []
    for key, value in d.items():
        lines.append('  ' * indent + str(key))
        if isinstance(value, dict):
            lines.append(dict_to_string(value, indent + 1))
        elif value is not None:  # Přidáno pro kontrolu hodnoty None
            for item in value:
                lines.append('  ' * (indent + 1) + str(item))
    return '\n'.join(lines)


if __name__ == "__main__":
    path = os.getcwd()  # aktuální adresář
    structure = get_directory_structure(path)
    string_structure = dict_to_string(structure)
    pyperclip.copy(string_structure)
    print(f"Struktura adresáře zkopírována do schránky!")
