import os
import json
import re
from PIL import Image, ImageDraw, ImageFilter

# Master mapping of SKUs to their calibrated template image
BATTERY_SKU_MAP = {
    # BOSCH (12 models)
    "02724HPIS4": "bosch-s4-group24.png",
    "02724HPS4": "bosch-s4-group24.png",
    "02727HPIS4": "bosch-s4-group27.png",
    "02727HPS4": "bosch-s4-group27.png",
    "02734HPS4": "bosch-s4-group24.png",
    "02742FES3": "bosch-s3-group42.png",
    "02742HPIS4": "bosch-s4-group42.png",
    "42HPS4": "bosch-s4-group42.png",
    "0277B6548": "bosch-s5-b65.png",
    "027N40FES4": "bosch-s4-ns40.png",
    "027NS40FEFS4": "bosch-s4-ns40.png",
    "027NS40FEIFS4": "bosch-s4-ns40.png",

    # BATERÍAS ECUADOR (28 models)
    "03024-FE": "ecuador-fe-group24.png",
    "03024-FE-I": "ecuador-fe-group24.png",
    "03024-HP-I": "ecuador-hp-group24.png",
    "03027-FE": "ecuador-fe-group24.png",
    "03027-FE-I": "ecuador-fe-group24.png",
    "03027-HP": "ecuador-hp-group27.png",
    "03027-HP-I": "ecuador-hp-group27.png",
    "03034-FE": "ecuador-fe-group24.png",
    "03034-FE-I": "ecuador-fe-group24.png",
    "03034-HP": "ecuador-hp-group34.png",
    "03034-HP-I": "ecuador-hp-group34.png",
    "03036-HP": "ecuador-hp-group34.png",
    "03042-FE": "ecuador-fe-group42.png",
    "03042-HP": "ecuador-hp-group42.png",
    "03042-HP-I": "ecuador-hp-group42.png",
    "03055-HD": "ecuador-fe-group24.png",
    "03055-HD-I": "ecuador-fe-group24.png",
    "03065-HP": "ecuador-hp-group34.png",
    "03066-HP": "ecuador-hp-group34.png",
    "030NS40-FE": "ecuador-fe-ns40.png",
    "030NS40-FE-I": "ecuador-fe-ns40.png",
    "030N40-FE-I": "ecuador-fe-ns40.png",
    "030NS40-HP": "ecuador-hp-ns40.png",
    "030N40-HP": "ecuador-hp-ns40.png",
    "030N40-HP-I": "ecuador-hp-ns40.png",
    "03031-SHD": "ecuador-shd-group31.png",
    "030N100-SHD-I": "ecuador-shd-group31.png",
    "030N150-SHD": "ecuador-shd-n150.png",
}

print(f"Total mapped SKUs: {len(BATTERY_SKU_MAP)}")
