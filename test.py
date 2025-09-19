import torch.nn as nn

class Modulation(nn.Module):
    def __init__(self, dim):
        self.dim = dim
        self.modulation = nn.Linear(dim, 6*dim)
        # or use a Modulelist(MLP)

    def forward(embed, x, text_len=256):
        (
            vid_scale,
            vid_shift,
            vid_gate,
            text_scale,
            text_shift,
            text_gate
        ) = self.modulation(embed).chunk(6, dim=-1)

        #... some linear here, we use x_proc as the processed feature.

        x_vid = x_proc[:, :-text_len]
        x_text = x_proc[:, -text_len:]

        x_vid = (x_vid[:, :-text_len] + vid_shift) * (1 + vid_scale)
        x_text = (x_text[:, -text_len:] + text_shift) * (1 + text_scale)

        #...

        x[:, :-text_len] = x[:, :-text_len] + x_vid*vid_gate
        x[:, -text_len:] = x[:, -text_len:] + x_text*text_gate

        return x

