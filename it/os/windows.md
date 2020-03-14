# Windows

## Tips

### Supprimer un bash installer sur Windows 10

@spences10 that's an old article. The new fall creators update add new executable file `wslconfig.exe`. 

Run command `wslconfig.exe /u Ubuntu`

to remove Ubuntu (replace Ubuntu with other distro name). Then reinstall it in normal way if you want to do.

Source : https://github.com/Microsoft/WSL/issues/2703#issuecomment-347577731
