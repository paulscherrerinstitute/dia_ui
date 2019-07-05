#!/bin/bash
filename=$1
case $filename in
    Eiger9M )
        echo "loads 9M config module script" ;;
    Eiger4M )
        echo "loads 4M config module script" ;;
esac