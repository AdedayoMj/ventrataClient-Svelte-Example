export type UnitID = "adult" | "child" | "senior" | "infant"
export type ContactField = "fullName" | "emailAddress" | "phoneNumber"



export interface ValidateJWT {
    valid: boolean
    payload?: any
}

export interface Product {
    id: string,
    name: string,
    options: OptionList[]
    defaultCurrency: string,
    availableCurrencies: string[]
}

export interface OptionList {
    id: string,
    default: boolean,
    name: string,
    requiredContactFields: ContactField[],
    units: Unit[]
}

export interface Unit {
    unitID: UnitID
    name: string,
    pricing: Pricing[]
}

export interface Pricing {
    currency: string,
    currencyPrecision: number,
    price: number,
}

export interface Contact{
    fullName: string | null,
    emailAddress: string | null,
    phoneNumber: string | null,
  }
export interface UnitCheck{
    adult:number,
    senior:number,
    child: number,
    infant: number
}

export interface UnitItem{
        unitId: UnitID, 
        quantity: number,
        price: number, 
}
export interface Booking{
        id: string,
        productId: string,
        optionId: string,
        pricing?: Pricing
        unitItems: UnitItem[],
        contact: Contact,
}