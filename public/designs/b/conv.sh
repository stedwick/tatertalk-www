#!/bin/zsh
# usage: conv.sh name thumbN
cd "$(dirname $0)/assets"
n=$1; t=$2
magick src/$n.png -resize 760x760 -quality 80 $n.webp
[ -n "$t" ] && magick src/$n.png -crop 600x600+212+90 -resize 96x96 -quality 82 thumb-$t.webp
