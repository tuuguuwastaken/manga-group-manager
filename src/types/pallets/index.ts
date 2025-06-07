import { Timestamp } from "firebase/firestore";

export type WeightUnit = 'kg' | 'g' | 'mg' | 'mcg';
export type VolumeUnit = 'L' | 'mL' | 'μL';

export type Unit = WeightUnit | VolumeUnit;

export type UnitType = 'weight' | 'volume';


export interface PalletWeightType {
    createdAt?: Timestamp | null,
    createdBy?: string | null,
    updatedAt?: Timestamp | null,
    updatedBy?: string | null,
    weight?: number,
    tray?: number,
    unit?: WeightUnit,
    type?: UnitType,
    farm?: string | null,
    block?: string | null,
    contractor?: string | null,
}