import type { Country, MutationDeleteCountryArgs, MutationCreateCountryArgs, MutationUpdateCountryArgs } from '../types/index';
/**
 * Fetch a Country by id
 *
 * @param id
 * @param context
 * @returns the Country
 */
export declare const country: (id: number, context: any) => Promise<Country>;
/**
 * Fetch all Countries
 *
 * @param context
 * @returns an array of Country
 */
export declare const countries: (context: any) => Promise<[Country]>;
/**
 * Insert a new Country
 *
 *  Note: requires authentication via the @auth directive on the mutation
 *
 * @param input The attritbutes for the new Country
 * @param context
 * @returns
 */
export declare const createCountry: ({ input }: MutationCreateCountryArgs, context: any) => Promise<Country>;
/**
 * Delete a Country
 *
 * Note: requires authentication via the @auth directive on the mutation
 *
 * @param id of the Country to delete
 * @param context
 * @returns
 */
export declare const deleteCountry: ({ id }: MutationDeleteCountryArgs, context: any) => Promise<Country>;
/**
 * Update a Country
 *
 * Note: requires authentication via the @auth directive on the mutation
 *
 * @param id pf the Country
 * @param input attributes to modify on th given Country
 * @param context
 * @returns
 */
export declare const updateCountry: ({ id, input }: MutationUpdateCountryArgs, context: any) => Promise<Country>;
//# sourceMappingURL=country.d.ts.map