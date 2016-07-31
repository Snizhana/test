from guess_language import guess_language


def encoder(initial_text, shift):
    modified_text = ""
    for ch in initial_text:
        if ch.isalpha():
            alphabet_position = ord(ch.lower()) + shift
            if alphabet_position > ord('z'):
                alphabet_position -= 26
            modified_text += chr(alphabet_position)
        else:
            modified_text += ch
    return modified_text


def decoder(initial_text, shift):
    modified_text = ""
    for ch in initial_text:
        if ch.isalpha():
            alphabet_position = ord(ch.lower()) - shift
            if alphabet_position < ord('a'):
                alphabet_position += 26
            modified_text += chr(alphabet_position)
        else:
            modified_text += ch
    return modified_text


def is_eng(text):
    return guess_language(text) == 'en'

