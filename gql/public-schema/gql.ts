/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query InvestigationChildPageMetadata($site: [String], $uri: [String]) {\n    entry(site: $site, uri: $uri) {\n      title\n    }\n  }\n": types.InvestigationChildPageMetadataDocument,
    "\n  query InvestigationChildPage($site: [String], $uri: [String]) {\n    entry(site: $site, uri: $uri) {\n      __typename\n      ...InvestigationChildPageTemplate\n    }\n  }\n": types.InvestigationChildPageDocument,
    "\n  query InvestigationId($site: [String], $uri: [String]) {\n    entry(site: $site, uri: $uri) {\n      id\n    }\n  }\n": types.InvestigationIdDocument,
    "\n  query InvestigationPage($site: [String], $uri: [String]) {\n    entry(site: $site, uri: $uri) {\n      __typename\n      ...InvestigationLandingPageTemplate\n    }\n  }\n": types.InvestigationPageDocument,
    "\n  query GlobalsQuery($site: [String], $section: [String]) {\n    headerNavItems: entries(section: $section, site: $site, level: 1) {\n      id\n      title\n      uri\n      children {\n        id\n        title\n        uri\n      }\n    }\n    siteInfo: globalSet(site: $site, handle: \"siteInfo\") {\n      ... on siteInfo_GlobalSet {\n        language\n        name\n        handle\n        siteTitle\n        siteDescription\n      }\n    }\n    categories(site: $site) {\n      id\n      slug\n      groupHandle\n      title\n    }\n  }\n": types.GlobalsQueryDocument,
    "\n  query HomepageQuery($site: [String], $uri: [String]) {\n    entry(site: $site, uri: $uri) {\n      __typename\n      ...HomepageTemplate\n    }\n  }\n": types.HomepageQueryDocument,
    "\n  query FacebookOauthUrl {\n    facebookOauthUrl\n  }\n": types.FacebookOauthUrlDocument,
    "\n  mutation GoogleSignInStudent($idToken: String!) {\n    googleSignInStudents(idToken: $idToken) {\n      ...AuthFragment\n    }\n  }\n": types.GoogleSignInStudentDocument,
    "\n  mutation GoogleSignInEducator($idToken: String!) {\n    googleSignInEducators(idToken: $idToken) {\n      ...AuthFragment\n    }\n  }\n": types.GoogleSignInEducatorDocument,
    "\n  mutation ActivateUser($code: String!, $id: String!) {\n    activateUser(code: $code, id: $id)\n  }\n": types.ActivateUserDocument,
    "\n  mutation ForgottenPassword($email: String!) {\n    forgottenPassword(email: $email)\n  }\n": types.ForgottenPasswordDocument,
    "\n  mutation SetPassword($password: String!, $code: String!, $id: String!) {\n    setPassword(password: $password, code: $code, id: $id)\n  }\n": types.SetPasswordDocument,
    "\n  mutation Authenticate($email: String!, $password: String!) {\n    authenticate(email: $email, password: $password) {\n      ...AuthFragment\n    }\n  }\n": types.AuthenticateDocument,
    "\n  mutation FacebookSignInStudent($code: String!) {\n    facebookSignInStudents(code: $code) {\n      ...AuthFragment\n    }\n  }\n": types.FacebookSignInStudentDocument,
    "\n  mutation FacebookSignInEducator($code: String!) {\n    facebookSignInEducators(code: $code) {\n      ...AuthFragment\n    }\n  }\n": types.FacebookSignInEducatorDocument,
    "\n  mutation RegisterEducator(\n    $email: String!\n    $password: String!\n    $fullName: String\n  ) {\n    registerEducators(email: $email, password: $password, fullName: $fullName) {\n      ...AuthFragment\n    }\n  }\n": types.RegisterEducatorDocument,
    "\n  mutation RegisterStudent(\n    $email: String!\n    $password: String!\n    $fullName: String\n  ) {\n    registerStudents(email: $email, password: $password, fullName: $fullName) {\n      ...AuthFragment\n    }\n  }\n": types.RegisterStudentDocument,
    "\n  fragment BarGraphToolBlock on contentBlocks_barGraphTool_BlockType {\n    title\n    yAxisMin\n    yAxisMax\n    yAxisLabel\n    xAxisLabel\n    graphBars {\n      ... on graphBars_bar_BlockType {\n        __typename\n        yValue\n        label\n      }\n    }\n  }\n": types.BarGraphToolBlockFragmentDoc,
    "\n  fragment ColorToolBlock on contentBlocks_colorTool_BlockType {\n    __typename\n    colorToolTemplate\n    readOnly\n    images {\n      ... on images_imageGroup_BlockType {\n        __typename\n        uri\n      }\n    }\n  }\n": types.ColorToolBlockFragmentDoc,
    "\n  fragment FilterToolBlock on contentBlocks_filterTool_BlockType {\n    __typename\n    preSelectedColor\n    readOnly\n  }\n": types.FilterToolBlockFragmentDoc,
    "\n  fragment QuestionsBlock on contentBlocks_questionBlock_BlockType {\n    questionEntries {\n      __typename\n      id\n      ...QuestionFactory\n    }\n  }\n": types.QuestionsBlockFragmentDoc,
    "\n  fragment ScatterplotToolBlock on contentBlocks_scatterplotTool_BlockType {\n    title\n    xAxisMin\n    yAxisMax\n    yAxisLabel\n    xAxisLabel\n    scatterplotItems {\n      ... on scatterplotItems_item_BlockType {\n        xValue\n        yValue\n        itemLabel\n      }\n    }\n  }\n": types.ScatterplotToolBlockFragmentDoc,
    "\n  fragment TextBlock on contentBlocks_text_BlockType {\n    text\n  }\n": types.TextBlockFragmentDoc,
    "\n  fragment TwoColumnContainerBlock on contentBlocks_twoColumnContainer_BlockType {\n    childBlocks: children {\n      __typename\n      id\n      ...ColorToolBlock\n      ...FilterToolBlock\n      ...TextBlock\n      ...BarGraphToolBlock\n      ...ScatterplotToolBlock\n    }\n  }\n": types.TwoColumnContainerBlockFragmentDoc,
    "\n  fragment WidgetContainerBlock on contentBlocks_widgetContainer_BlockType {\n    childBlocks: children {\n      __typename\n      id\n      ...BarGraphToolBlock\n      ...ScatterplotToolBlock\n    }\n  }\n": types.WidgetContainerBlockFragmentDoc,
    "\n  fragment ContentBlockFactory on contentBlocks_NeoField {\n    __typename\n    ...BarGraphToolBlock\n    ...ColorToolBlock\n    ...FilterToolBlock\n    ...QuestionsBlock\n    ...ScatterplotToolBlock\n    ...TextBlock\n    ...TwoColumnContainerBlock\n    ...WidgetContainerBlock\n  }\n": types.ContentBlockFactoryFragmentDoc,
    "\n  fragment QuestionFactory on questions_default_Entry {\n    answerType\n    answerOptions {\n      ... on answerOptions_option_BlockType {\n        label: optionLabel\n        value: optionValue\n      }\n    }\n    id\n    questionText\n  }\n": types.QuestionFactoryFragmentDoc,
    "\n  fragment SimpleContentBlockFactory on contentBlocks_NeoField {\n    __typename\n    ...TextBlock\n  }\n": types.SimpleContentBlockFactoryFragmentDoc,
    "\n  fragment TemplateFactory on EntryInterface {\n    __typename\n    ...PageTemplate\n  }\n": types.TemplateFactoryFragmentDoc,
    "\n  fragment HomepageTemplate on homepage_homepage_Entry {\n    id\n    title\n    contentBlocks {\n      ...ContentBlockFactory\n    }\n  }\n": types.HomepageTemplateFragmentDoc,
    "\n  fragment InvestigationChildPageTemplate on investigations_default_Entry {\n    id\n    title\n    contentBlocks {\n      ...ContentBlockFactory\n    }\n    hasSavePoint\n    prev(section: \"investigations\") {\n      __typename\n      uri\n    }\n    next(section: \"investigations\") {\n      __typename\n      uri\n    }\n    parent {\n      id\n      children(section: \"investigations\", type: \"default\") {\n        __typename\n        id\n        title\n        ... on investigations_default_Entry {\n          hasSavePoint\n        }\n      }\n    }\n  }\n": types.InvestigationChildPageTemplateFragmentDoc,
    "\n  fragment InvestigationLandingPageTemplate on investigations_investigationParent_Entry {\n    title\n    children {\n      uri\n    }\n  }\n": types.InvestigationLandingPageTemplateFragmentDoc,
    "\n  fragment PageTemplate on pages_pages_Entry {\n    id\n    title\n    contentBlocks {\n      ...ContentBlockFactory\n    }\n  }\n": types.PageTemplateFragmentDoc,
    "fragment AuthFragment on Auth {\n  jwt\n  jwtExpiresAt\n  refreshToken\n  refreshTokenExpiresAt\n  user {\n    ...UserFragment\n  }\n}": types.AuthFragmentFragmentDoc,
    "fragment UserFragment on UserInterface {\n  id\n  status\n}": types.UserFragmentFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query InvestigationChildPageMetadata($site: [String], $uri: [String]) {\n    entry(site: $site, uri: $uri) {\n      title\n    }\n  }\n"): (typeof documents)["\n  query InvestigationChildPageMetadata($site: [String], $uri: [String]) {\n    entry(site: $site, uri: $uri) {\n      title\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query InvestigationChildPage($site: [String], $uri: [String]) {\n    entry(site: $site, uri: $uri) {\n      __typename\n      ...InvestigationChildPageTemplate\n    }\n  }\n"): (typeof documents)["\n  query InvestigationChildPage($site: [String], $uri: [String]) {\n    entry(site: $site, uri: $uri) {\n      __typename\n      ...InvestigationChildPageTemplate\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query InvestigationId($site: [String], $uri: [String]) {\n    entry(site: $site, uri: $uri) {\n      id\n    }\n  }\n"): (typeof documents)["\n  query InvestigationId($site: [String], $uri: [String]) {\n    entry(site: $site, uri: $uri) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query InvestigationPage($site: [String], $uri: [String]) {\n    entry(site: $site, uri: $uri) {\n      __typename\n      ...InvestigationLandingPageTemplate\n    }\n  }\n"): (typeof documents)["\n  query InvestigationPage($site: [String], $uri: [String]) {\n    entry(site: $site, uri: $uri) {\n      __typename\n      ...InvestigationLandingPageTemplate\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GlobalsQuery($site: [String], $section: [String]) {\n    headerNavItems: entries(section: $section, site: $site, level: 1) {\n      id\n      title\n      uri\n      children {\n        id\n        title\n        uri\n      }\n    }\n    siteInfo: globalSet(site: $site, handle: \"siteInfo\") {\n      ... on siteInfo_GlobalSet {\n        language\n        name\n        handle\n        siteTitle\n        siteDescription\n      }\n    }\n    categories(site: $site) {\n      id\n      slug\n      groupHandle\n      title\n    }\n  }\n"): (typeof documents)["\n  query GlobalsQuery($site: [String], $section: [String]) {\n    headerNavItems: entries(section: $section, site: $site, level: 1) {\n      id\n      title\n      uri\n      children {\n        id\n        title\n        uri\n      }\n    }\n    siteInfo: globalSet(site: $site, handle: \"siteInfo\") {\n      ... on siteInfo_GlobalSet {\n        language\n        name\n        handle\n        siteTitle\n        siteDescription\n      }\n    }\n    categories(site: $site) {\n      id\n      slug\n      groupHandle\n      title\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query HomepageQuery($site: [String], $uri: [String]) {\n    entry(site: $site, uri: $uri) {\n      __typename\n      ...HomepageTemplate\n    }\n  }\n"): (typeof documents)["\n  query HomepageQuery($site: [String], $uri: [String]) {\n    entry(site: $site, uri: $uri) {\n      __typename\n      ...HomepageTemplate\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FacebookOauthUrl {\n    facebookOauthUrl\n  }\n"): (typeof documents)["\n  query FacebookOauthUrl {\n    facebookOauthUrl\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation GoogleSignInStudent($idToken: String!) {\n    googleSignInStudents(idToken: $idToken) {\n      ...AuthFragment\n    }\n  }\n"): (typeof documents)["\n  mutation GoogleSignInStudent($idToken: String!) {\n    googleSignInStudents(idToken: $idToken) {\n      ...AuthFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation GoogleSignInEducator($idToken: String!) {\n    googleSignInEducators(idToken: $idToken) {\n      ...AuthFragment\n    }\n  }\n"): (typeof documents)["\n  mutation GoogleSignInEducator($idToken: String!) {\n    googleSignInEducators(idToken: $idToken) {\n      ...AuthFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ActivateUser($code: String!, $id: String!) {\n    activateUser(code: $code, id: $id)\n  }\n"): (typeof documents)["\n  mutation ActivateUser($code: String!, $id: String!) {\n    activateUser(code: $code, id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ForgottenPassword($email: String!) {\n    forgottenPassword(email: $email)\n  }\n"): (typeof documents)["\n  mutation ForgottenPassword($email: String!) {\n    forgottenPassword(email: $email)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SetPassword($password: String!, $code: String!, $id: String!) {\n    setPassword(password: $password, code: $code, id: $id)\n  }\n"): (typeof documents)["\n  mutation SetPassword($password: String!, $code: String!, $id: String!) {\n    setPassword(password: $password, code: $code, id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Authenticate($email: String!, $password: String!) {\n    authenticate(email: $email, password: $password) {\n      ...AuthFragment\n    }\n  }\n"): (typeof documents)["\n  mutation Authenticate($email: String!, $password: String!) {\n    authenticate(email: $email, password: $password) {\n      ...AuthFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation FacebookSignInStudent($code: String!) {\n    facebookSignInStudents(code: $code) {\n      ...AuthFragment\n    }\n  }\n"): (typeof documents)["\n  mutation FacebookSignInStudent($code: String!) {\n    facebookSignInStudents(code: $code) {\n      ...AuthFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation FacebookSignInEducator($code: String!) {\n    facebookSignInEducators(code: $code) {\n      ...AuthFragment\n    }\n  }\n"): (typeof documents)["\n  mutation FacebookSignInEducator($code: String!) {\n    facebookSignInEducators(code: $code) {\n      ...AuthFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RegisterEducator(\n    $email: String!\n    $password: String!\n    $fullName: String\n  ) {\n    registerEducators(email: $email, password: $password, fullName: $fullName) {\n      ...AuthFragment\n    }\n  }\n"): (typeof documents)["\n  mutation RegisterEducator(\n    $email: String!\n    $password: String!\n    $fullName: String\n  ) {\n    registerEducators(email: $email, password: $password, fullName: $fullName) {\n      ...AuthFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RegisterStudent(\n    $email: String!\n    $password: String!\n    $fullName: String\n  ) {\n    registerStudents(email: $email, password: $password, fullName: $fullName) {\n      ...AuthFragment\n    }\n  }\n"): (typeof documents)["\n  mutation RegisterStudent(\n    $email: String!\n    $password: String!\n    $fullName: String\n  ) {\n    registerStudents(email: $email, password: $password, fullName: $fullName) {\n      ...AuthFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment BarGraphToolBlock on contentBlocks_barGraphTool_BlockType {\n    title\n    yAxisMin\n    yAxisMax\n    yAxisLabel\n    xAxisLabel\n    graphBars {\n      ... on graphBars_bar_BlockType {\n        __typename\n        yValue\n        label\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment BarGraphToolBlock on contentBlocks_barGraphTool_BlockType {\n    title\n    yAxisMin\n    yAxisMax\n    yAxisLabel\n    xAxisLabel\n    graphBars {\n      ... on graphBars_bar_BlockType {\n        __typename\n        yValue\n        label\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ColorToolBlock on contentBlocks_colorTool_BlockType {\n    __typename\n    colorToolTemplate\n    readOnly\n    images {\n      ... on images_imageGroup_BlockType {\n        __typename\n        uri\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment ColorToolBlock on contentBlocks_colorTool_BlockType {\n    __typename\n    colorToolTemplate\n    readOnly\n    images {\n      ... on images_imageGroup_BlockType {\n        __typename\n        uri\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FilterToolBlock on contentBlocks_filterTool_BlockType {\n    __typename\n    preSelectedColor\n    readOnly\n  }\n"): (typeof documents)["\n  fragment FilterToolBlock on contentBlocks_filterTool_BlockType {\n    __typename\n    preSelectedColor\n    readOnly\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment QuestionsBlock on contentBlocks_questionBlock_BlockType {\n    questionEntries {\n      __typename\n      id\n      ...QuestionFactory\n    }\n  }\n"): (typeof documents)["\n  fragment QuestionsBlock on contentBlocks_questionBlock_BlockType {\n    questionEntries {\n      __typename\n      id\n      ...QuestionFactory\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ScatterplotToolBlock on contentBlocks_scatterplotTool_BlockType {\n    title\n    xAxisMin\n    yAxisMax\n    yAxisLabel\n    xAxisLabel\n    scatterplotItems {\n      ... on scatterplotItems_item_BlockType {\n        xValue\n        yValue\n        itemLabel\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment ScatterplotToolBlock on contentBlocks_scatterplotTool_BlockType {\n    title\n    xAxisMin\n    yAxisMax\n    yAxisLabel\n    xAxisLabel\n    scatterplotItems {\n      ... on scatterplotItems_item_BlockType {\n        xValue\n        yValue\n        itemLabel\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TextBlock on contentBlocks_text_BlockType {\n    text\n  }\n"): (typeof documents)["\n  fragment TextBlock on contentBlocks_text_BlockType {\n    text\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TwoColumnContainerBlock on contentBlocks_twoColumnContainer_BlockType {\n    childBlocks: children {\n      __typename\n      id\n      ...ColorToolBlock\n      ...FilterToolBlock\n      ...TextBlock\n      ...BarGraphToolBlock\n      ...ScatterplotToolBlock\n    }\n  }\n"): (typeof documents)["\n  fragment TwoColumnContainerBlock on contentBlocks_twoColumnContainer_BlockType {\n    childBlocks: children {\n      __typename\n      id\n      ...ColorToolBlock\n      ...FilterToolBlock\n      ...TextBlock\n      ...BarGraphToolBlock\n      ...ScatterplotToolBlock\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment WidgetContainerBlock on contentBlocks_widgetContainer_BlockType {\n    childBlocks: children {\n      __typename\n      id\n      ...BarGraphToolBlock\n      ...ScatterplotToolBlock\n    }\n  }\n"): (typeof documents)["\n  fragment WidgetContainerBlock on contentBlocks_widgetContainer_BlockType {\n    childBlocks: children {\n      __typename\n      id\n      ...BarGraphToolBlock\n      ...ScatterplotToolBlock\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ContentBlockFactory on contentBlocks_NeoField {\n    __typename\n    ...BarGraphToolBlock\n    ...ColorToolBlock\n    ...FilterToolBlock\n    ...QuestionsBlock\n    ...ScatterplotToolBlock\n    ...TextBlock\n    ...TwoColumnContainerBlock\n    ...WidgetContainerBlock\n  }\n"): (typeof documents)["\n  fragment ContentBlockFactory on contentBlocks_NeoField {\n    __typename\n    ...BarGraphToolBlock\n    ...ColorToolBlock\n    ...FilterToolBlock\n    ...QuestionsBlock\n    ...ScatterplotToolBlock\n    ...TextBlock\n    ...TwoColumnContainerBlock\n    ...WidgetContainerBlock\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment QuestionFactory on questions_default_Entry {\n    answerType\n    answerOptions {\n      ... on answerOptions_option_BlockType {\n        label: optionLabel\n        value: optionValue\n      }\n    }\n    id\n    questionText\n  }\n"): (typeof documents)["\n  fragment QuestionFactory on questions_default_Entry {\n    answerType\n    answerOptions {\n      ... on answerOptions_option_BlockType {\n        label: optionLabel\n        value: optionValue\n      }\n    }\n    id\n    questionText\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment SimpleContentBlockFactory on contentBlocks_NeoField {\n    __typename\n    ...TextBlock\n  }\n"): (typeof documents)["\n  fragment SimpleContentBlockFactory on contentBlocks_NeoField {\n    __typename\n    ...TextBlock\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TemplateFactory on EntryInterface {\n    __typename\n    ...PageTemplate\n  }\n"): (typeof documents)["\n  fragment TemplateFactory on EntryInterface {\n    __typename\n    ...PageTemplate\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment HomepageTemplate on homepage_homepage_Entry {\n    id\n    title\n    contentBlocks {\n      ...ContentBlockFactory\n    }\n  }\n"): (typeof documents)["\n  fragment HomepageTemplate on homepage_homepage_Entry {\n    id\n    title\n    contentBlocks {\n      ...ContentBlockFactory\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment InvestigationChildPageTemplate on investigations_default_Entry {\n    id\n    title\n    contentBlocks {\n      ...ContentBlockFactory\n    }\n    hasSavePoint\n    prev(section: \"investigations\") {\n      __typename\n      uri\n    }\n    next(section: \"investigations\") {\n      __typename\n      uri\n    }\n    parent {\n      id\n      children(section: \"investigations\", type: \"default\") {\n        __typename\n        id\n        title\n        ... on investigations_default_Entry {\n          hasSavePoint\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment InvestigationChildPageTemplate on investigations_default_Entry {\n    id\n    title\n    contentBlocks {\n      ...ContentBlockFactory\n    }\n    hasSavePoint\n    prev(section: \"investigations\") {\n      __typename\n      uri\n    }\n    next(section: \"investigations\") {\n      __typename\n      uri\n    }\n    parent {\n      id\n      children(section: \"investigations\", type: \"default\") {\n        __typename\n        id\n        title\n        ... on investigations_default_Entry {\n          hasSavePoint\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment InvestigationLandingPageTemplate on investigations_investigationParent_Entry {\n    title\n    children {\n      uri\n    }\n  }\n"): (typeof documents)["\n  fragment InvestigationLandingPageTemplate on investigations_investigationParent_Entry {\n    title\n    children {\n      uri\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PageTemplate on pages_pages_Entry {\n    id\n    title\n    contentBlocks {\n      ...ContentBlockFactory\n    }\n  }\n"): (typeof documents)["\n  fragment PageTemplate on pages_pages_Entry {\n    id\n    title\n    contentBlocks {\n      ...ContentBlockFactory\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment AuthFragment on Auth {\n  jwt\n  jwtExpiresAt\n  refreshToken\n  refreshTokenExpiresAt\n  user {\n    ...UserFragment\n  }\n}"): (typeof documents)["fragment AuthFragment on Auth {\n  jwt\n  jwtExpiresAt\n  refreshToken\n  refreshTokenExpiresAt\n  user {\n    ...UserFragment\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment UserFragment on UserInterface {\n  id\n  status\n}"): (typeof documents)["fragment UserFragment on UserInterface {\n  id\n  status\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;