#!/bin/bash
# Replace placeholder with GTM ID
sed -i "s/%%GTM_ID%%/$GTM_ID/g" index.html
# Copy modified HTML to the public directory
cp index.html public/
cp index.css public/
cp index.js public/
cp robots.txt public/
cp words.json public/

