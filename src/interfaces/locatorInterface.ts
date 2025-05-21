export interface LocatorRoleName {
    role: 'link' | 'button' | 'textbox' | 'combobox' | 'spinbutton' | 'gridcell' | 'menuitem' | 'alert';
    name?: string;
};

export interface LocatorLabelName {
    label: string;
    options?: object;
};