import { v7 as uuidv7, validate as uuidValidate } from 'uuid';

export const generateUUID = (): string => {
    return uuidv7();
};

export const validateUUID = (uuid: string): boolean => {
    return uuidValidate(uuid);
}