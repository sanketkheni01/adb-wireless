# adb-wireless

**install**

```
npm i -g adb-wireless
```

open setting on your android device and enable wireless debugging from developer tools and run to connect the android device

```
adb-wireless -i {device-ip} -p {port}
```

Next time you want to connect your device just run

```
adb-wireless connect
```

it will automatically find a port and ip to connect.
