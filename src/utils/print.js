import ThermalPrinterModule from 'react-native-thermal-printer';
import Toast from 'react-native-simple-toast';

const data =
  "[C]<font size='tall'>ORDER#-12345</font>\n" +
  '[L]\n' +
  '[C]________________________________________________\n' +
  '[L]\n' +
  '[L]<b>BEAUTIFUL SHIRT</b>[R]$9.99\n' +
  '[L]  + Size : S\n' +
  '[L]\n' +
  '[L]<b>AWESOME HAT</b>[R]$24.99\n' +
  '[L]  + Size : 57/58\n' +
  '[L]\n' +
  '[C]________________________________________________\n' +
  '[L]TOTAL PRICE :[R]$34.98\n' +
  '[L]TAX :[R]$4.23\n' +
  '[L]\n' +
  '[C]________________________________________________\n' +
  '[L]\n' +
  "[C]<barcode type='ean13' height='10'>831254784551</barcode>\n" +
  '[L]\n' +
  '[L]\n';

export async function printReceipt() {
  try {
    await ThermalPrinterModule.getBluetoothDeviceList();

    await ThermalPrinterModule.printBluetooth({
      macAddress: '86:67:7A:4B:BA:A2',
      payload: data,
      printerNbrCharactersPerLine: 48,
    });
  } catch (err) {
    Toast.show(`Print failed: ${err.response.data.message}`, ToastAndroid.LONG);
  }
}