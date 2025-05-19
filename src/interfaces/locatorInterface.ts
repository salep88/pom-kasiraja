export interface LocatorRoleName {
    role: 'link' | 'button' | 'textbox' | 'combobox' | 'spinbutton' | 'gridcell';
    name?: string;
}

export interface LocatorLabelName {
    label: string;
    options?: object;
}