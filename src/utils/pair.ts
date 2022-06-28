import QRCode from 'qrcode'

export default function pair() {
  const password = Math.floor(Math.random() * 1000000 + 1).toString()
  var text = 'WIFI:T:ADB;S:ADBQR-connectPhoneOverWifi;P:' + password + ';;'

  QRCode.toString(
    text,
    // @ts-ignore
    { type: 'terminal', small: true },
    function (_err: any, url: any) {
      console.log(url)
    }
  )
}
