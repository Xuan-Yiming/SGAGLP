#!/bin/bash

folder_path="/tests"  

for file in "$folder_path"/*.py; do
    if [[ -f "$file" ]]; then
        python "$file"
    fi
done