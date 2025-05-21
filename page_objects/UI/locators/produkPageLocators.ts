import { LocatorRoleName, LocatorLabelName } from "../../../src/interfaces/locatorInterface";

export const produkPage = {
    produkMenu : { role: 'link', name: 'produk'} as LocatorRoleName,
    tambahBttn : { role: 'link', name: 'tambah' } as LocatorRoleName,
    searchField : { role: 'textbox', name: 'cari' } as LocatorRoleName,
    searchBttn : '.chakra-input__right-element' as string,
    categoryField : { label: "", options: { exact: true } } as LocatorLabelName,
    toastPopup : '#chakra-toast-manager-top-right'as string,
    produkMenuItem : '[aria-haspopup="menu"]' as string,
    ubahEllipsisMenuItem : { role: 'menuitem', name: 'ubah' } as LocatorRoleName,
};

export const addProdukPage = {
    namaField : { role: 'textbox', name: 'nama' } as LocatorRoleName,
    deskripsiField : { role: 'textbox', name: 'deskripsi' } as LocatorRoleName,
    hargaBeliField : { role: 'textbox', name: 'harga beli' } as LocatorRoleName,
    hargaJualField : { role: 'textbox', name: 'harga jual' } as LocatorRoleName,
    stokField : { role: 'textbox', name: 'stok' } as LocatorRoleName,
    kategoriField : { role: 'textbox', name: 'kategori' } as LocatorRoleName,
    searchfieldKategory : { role: 'textbox', name: 'cari' } as LocatorRoleName,
    kategoriList : { role: 'gridcell'} as LocatorRoleName,
    simpanBttn : { role: 'button', name: 'simpan' } as LocatorRoleName,
    formAlertMessage : { role: 'alert' } as LocatorRoleName
}