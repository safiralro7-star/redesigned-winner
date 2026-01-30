@echo off

REM This script will wipe the specified disk entirely. 
REM !! WARNING: This is a highly destructive operation and will erase ALL data !!
REM Make sure you select the correct disk number below. 
REM Run this script as an administrator.

REM The 'select disk X' command needs to be dynamically set based on which disk 
REM the user wants to erase. For security, it's safer to use an interactive prompt 
REM or a specific, non-boot disk number if hardcoding for a specific setup.

echo Starting disk wipe process for a selected disk...
diskpart /s disk_script.txt
echo Disk wipe process initiated.

