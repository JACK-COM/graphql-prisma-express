/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { GQLContext } from "./../context"




declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  ResourceByIdInput: { // input type
    id: number; // Int!
  }
  UserQueryInput: { // input type
    email?: string | null; // String
    id: number; // Int!
    password?: string | null; // String
  }
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  Mutation: {};
  Query: {};
  User: { // root type
    email: string; // String!
    id: number; // Int!
    lastSeen: string; // String!
    password: string; // String!
  }
  UserExternal: { // root type
    email: string; // String!
    id: number; // Int!
    lastSeen: string; // String!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Mutation: { // field return type
    createUser: NexusGenRootTypes['UserExternal'] | null; // UserExternal
    deleteUser: NexusGenRootTypes['UserExternal'] | null; // UserExternal
    updateUser: NexusGenRootTypes['UserExternal'] | null; // UserExternal
  }
  Query: { // field return type
    getUser: NexusGenRootTypes['UserExternal'] | null; // UserExternal
    listUsers: Array<NexusGenRootTypes['UserExternal'] | null> | null; // [UserExternal]
  }
  User: { // field return type
    email: string; // String!
    id: number; // Int!
    lastSeen: string; // String!
    password: string; // String!
  }
  UserExternal: { // field return type
    email: string; // String!
    id: number; // Int!
    lastSeen: string; // String!
  }
}

export interface NexusGenFieldTypeNames {
  Mutation: { // field return type name
    createUser: 'UserExternal'
    deleteUser: 'UserExternal'
    updateUser: 'UserExternal'
  }
  Query: { // field return type name
    getUser: 'UserExternal'
    listUsers: 'UserExternal'
  }
  User: { // field return type name
    email: 'String'
    id: 'Int'
    lastSeen: 'String'
    password: 'String'
  }
  UserExternal: { // field return type name
    email: 'String'
    id: 'Int'
    lastSeen: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createUser: { // args
      email: string; // String!
      password: string; // String!
    }
    deleteUser: { // args
      data?: NexusGenInputs['ResourceByIdInput'] | null; // ResourceByIdInput
    }
    updateUser: { // args
      data?: NexusGenInputs['UserQueryInput'] | null; // UserQueryInput
    }
  }
  Query: {
    getUser: { // args
      data?: NexusGenInputs['UserQueryInput'] | null; // UserQueryInput
    }
    listUsers: { // args
      email?: string | null; // String
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: GQLContext;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}