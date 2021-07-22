import defaultQuery from './defaultMutation';
import { CreatePasswordResetTokenResponse } from 'src/types/Api';
import { Context, CustomQuery, Logger } from '@vue-storefront/core';
import gql from 'graphql-tag';
import { getStoreKey } from '../../helpers/utils';

const customerCreatePasswordResetToken = async (context: Context, email: string, customQuery?: CustomQuery): Promise<CreatePasswordResetTokenResponse> => {
  const { locale, acceptLanguage, store } = context.config;

  const userVariables = email ? {
    locale,
    email
  } : {};

  const defaultVariables = {
    ...userVariables,
    acceptLanguage,
    storeKey: getStoreKey(store)
  };

  const { customerCreatePasswordResetToken } = context.extendQuery(
    customQuery, { customerCreatePasswordResetToken: { query: defaultQuery, variables: defaultVariables } }
  );

  try {
    return await context.client.mutate({
      mutation: gql`${customerCreatePasswordResetToken.query}`,
      variables: customerCreatePasswordResetToken.variables,
      fetchPolicy: 'no-cache'
    }) as CreatePasswordResetTokenResponse;
  } catch (error) {
    Logger.error(`Cannot create password reset token. Error: ${error}`);
    throw error;
  }
};

export default customerCreatePasswordResetToken;
