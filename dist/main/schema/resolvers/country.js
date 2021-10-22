"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCountry = exports.deleteCountry = exports.createCountry = exports.countries = exports.country = void 0;
const graphql_1 = require("graphql");
const supabase_1 = require("../../lib/supabase");
/**
 * Fetch a Country by id
 *
 * @param id
 * @param context
 * @returns the Country
 */
const country = (id, context) => __awaiter(void 0, void 0, void 0, function* () {
    const { data: country, error } = yield supabase_1.supabase
        .from('countries')
        .select('id, name, local_name, continent, iso2, iso3')
        .eq('id', id)
        .single();
    if (error) {
        context.req['log'].error(error, error.message);
        throw new graphql_1.GraphQLError('Country not found');
    }
    return country;
});
exports.country = country;
/**
 * Fetch all Countries
 *
 * @param context
 * @returns an array of Country
 */
const countries = (context) => __awaiter(void 0, void 0, void 0, function* () {
    const { data: countries, error } = yield supabase_1.supabase
        .from('countries')
        .select('id, name, local_name, continent, iso2, iso3')
        .order('name', { ascending: true });
    if (error) {
        context.req['log'].error(error, error.message);
        throw new graphql_1.GraphQLError('Could not fetch Countries.');
    }
    return countries;
});
exports.countries = countries;
/**
 * Insert a new Country
 *
 *  Note: requires authentication via the @auth directive on the mutation
 *
 * @param input The attritbutes for the new Country
 * @param context
 * @returns
 */
const createCountry = ({ input }, context) => __awaiter(void 0, void 0, void 0, function* () {
    const { data: countries, error } = yield supabase_1.supabase
        .from('countries')
        .insert([input]);
    if (!countries || error) {
        context.req['log'].error(error, error.message);
        throw new graphql_1.GraphQLError('Country could not be created');
    }
    return countries && countries[0];
});
exports.createCountry = createCountry;
/**
 * Delete a Country
 *
 * Note: requires authentication via the @auth directive on the mutation
 *
 * @param id of the Country to delete
 * @param context
 * @returns
 */
const deleteCountry = ({ id }, context) => __awaiter(void 0, void 0, void 0, function* () {
    const { data: countries, error } = yield supabase_1.supabase
        .from('countries')
        .delete()
        .eq('id', id);
    if (!countries || error) {
        context.req['log'].error(error, error.message);
        throw new graphql_1.GraphQLError('Country could not be deleted');
    }
    return countries && countries[0];
});
exports.deleteCountry = deleteCountry;
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
const updateCountry = ({ id, input }, context) => __awaiter(void 0, void 0, void 0, function* () {
    const { data: countries, error } = yield supabase_1.supabase
        .from('countries')
        .update(input)
        .eq('id', id);
    if (!countries || error) {
        context.req['log'].error(error, error.message);
        throw new graphql_1.GraphQLError('Country could not be updated');
    }
    return countries && countries[0];
});
exports.updateCountry = updateCountry;
//# sourceMappingURL=country.js.map