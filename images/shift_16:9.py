# padding image to 16:9
import cv2
import numpy as np

def padding_16_9(img):
    h, w, _ = img.shape
    if h / w > 9 / 16:
        pad = int((h - w * 9 / 16) / 2)
        img = cv2.copyMakeBorder(img, 0, 0, pad, pad, cv2.BORDER_CONSTANT, value=[255, 255, 255])
    else:
        pad = int((w - h * 16 / 9) / 2)
        img = cv2.copyMakeBorder(img, pad, pad, 0, 0, cv2.BORDER_CONSTANT, value=[255, 255, 255])
    print(img.shape)
    return img

img = cv2.imread('/Users/julianjuaner/Documents/GitHub/JulianJuaner.github.io/images/magicmirror.png')
pad_img = padding_16_9(img)

cv2.imwrite('/Users/julianjuaner/Documents/GitHub/JulianJuaner.github.io/images/magicmirror_16_9.png', pad_img)

# padding gif to 16:9
import imageio
import os

def padding_gif_16_9(gif):
    pad_gif = []
    for img in gif:
        print(img.shape)
        pad_img = padding_16_9(img)
        pad_gif.append(pad_img)
    return pad_gif

# gif = imageio.mimread('/Users/julianjuaner/Documents/GitHub/JulianJuaner.github.io/images/magicmirror-default.gif')
# pad_gif = padding_gif_16_9(gif)

# # save
# path = '/Users/julianjuaner/Documents/GitHub/JulianJuaner.github.io/images/magicmirror-default_16_9.gif'
# imageio.mimsave(path, pad_gif)