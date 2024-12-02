import cv2
import numpy as np
import imageio

def padding_16_9(img):
    h, w, _ = img.shape
    if h / w > 9 / 16:
        pad = int((h - w * 9 / 16) / 2)
        img = cv2.copyMakeBorder(img, 0, 0, pad, pad, cv2.BORDER_CONSTANT, value=[255, 255, 255])
    else:
        pad = int((w - h * 16 / 9) / 2)
        img = cv2.copyMakeBorder(img, pad, pad, 0, 0, cv2.BORDER_CONSTANT, value=[255, 255, 255])
    return img

def padding_gif_16_9(gif):
    pad_gif = []
    for img in gif:
        if len(img.shape) == 2:
            img = np.stack((img,)*3, axis=-1)
        pad_img = padding_16_9(img)
        pad_gif.append(pad_img)
    return pad_gif

input_path = '/Users/julianjuaner/Documents/GitHub/JulianJuaner.github.io/images/magicmirror.gif'
output_path = '/Users/julianjuaner/Documents/GitHub/JulianJuaner.github.io/images/magicmirror-default_16_9_6fps.gif'

# 读取gif
gif = imageio.mimread(input_path, memtest=False)

# padding
pad_gif = padding_gif_16_9(gif)

# 保存时设置duration来控制帧率（1/fps为每帧的持续时间，单位为秒）
imageio.mimsave(output_path, pad_gif, duration=1/25)  # 6fps