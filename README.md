# adb-wireless

## **install**

```
npm i -g adb-wireless
```

Open setting on your android device and enable wireless debugging from developer tools

![alt text](https://github.com/sanketkheni01/adb-wireless/blob/master/images/developer_settings.jpg?raw=true)

## Pair

```
adb-wireless pair
```

And scan qr code from wireless debugging

![alt text](https://github.com/sanketkheni01/adb-wireless/blob/master/images/wireless%20debugging.jpg?raw=true)

## Connect

```
adb-wireless connect -i {device-ip}
```

Next time you can connect your device directly with

```
adb-wireless connect
```

it will automatically find a port and ip to connect.

Remember to make your android device ip static for better experience
