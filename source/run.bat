@echo off
start "" http://localhost:1313/
hugo_extended_0.164.0.exe server --disableFastRender
if errorlevel 1 pause
