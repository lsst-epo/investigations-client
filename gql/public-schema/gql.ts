/* eslint-disable */
import * as types from "./graphql";
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

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
  "\n  query ReferenceContent($site: [String], $uri: [String]) {\n    entry(site: $site, uri: $uri) {\n      ...ReferenceContentTemplate\n    }\n  }\n":
    types.ReferenceContentDocument,
  "\n  query InvestigationChildPage($site: [String], $uri: [String]) {\n    entry(site: $site, uri: $uri) {\n      ...InvestigationChildPageTemplate\n      ...InvestigationSectionBreakTemplate\n    }\n  }\n":
    types.InvestigationChildPageDocument,
  "\n  query InvestigationChildPageMetadata($site: [String], $uri: [String]) {\n    entry(site: $site, uri: $uri) {\n      title\n    }\n  }\n":
    types.InvestigationChildPageMetadataDocument,
  "\n  query InvestigationMetadata($site: [String], $uri: [String]) {\n    entry(site: $site, uri: $uri) {\n      ... on investigations_investigationParent_Entry {\n        title\n      }\n    }\n  }\n":
    types.InvestigationMetadataDocument,
  "\n  query InvestigationId($site: [String], $uri: [String]) {\n    entry(site: $site, uri: $uri) {\n      ... on investigations_investigationParent_Entry {\n        __typename\n        id\n        acknowledgements: text\n        children {\n          __typename\n          title\n          id\n          uri\n          ... on investigations_default_Entry {\n            hasSavePoint\n            contentBlocks {\n              __typename\n              ...QuestionsBlock\n              ... on contentBlocks_twoColumnContainer_BlockType {\n                columns: children {\n                  __typename\n                  ... on contentBlocks_colLeft_BlockType {\n                    children {\n                      ...QuestionsBlock\n                      ... on contentBlocks_group_BlockType {\n                        group: children {\n                          ...QuestionsBlock\n                        }\n                      }\n                    }\n                  }\n                  ... on contentBlocks_colRight_BlockType {\n                    children {\n                      __typename\n                      ...QuestionsBlock\n                      ... on contentBlocks_group_BlockType {\n                        group: children {\n                          ... on contentBlocks_questionBlock_BlockType {\n                            __typename\n                            questionEntries {\n                              ...QuestionEntry\n                            }\n                          }\n                        }\n                      }\n                    }\n                  }\n                }\n              }\n              ... on contentBlocks_group_BlockType {\n                group: children {\n                  ...QuestionsBlock\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n":
    types.InvestigationIdDocument,
  "\n  query InvestigationPage($site: [String], $uri: [String]) {\n    entry(site: $site, uri: $uri) {\n      __typename\n      ...InvestigationLandingPageTemplate\n    }\n  }\n":
    types.InvestigationPageDocument,
  "\n  query ReviewPage($site: [String], $uri: [String]) {\n    entry(site: $site, uri: $uri) {\n      ... on investigations_investigationParent_Entry {\n        title\n      }\n    }\n  }\n":
    types.ReviewPageDocument,
  '\n  query GlobalsQuery($site: [String]) {\n    siteInfo: globalSet(site: $site, handle: "siteInfo") {\n      ... on siteInfo_GlobalSet {\n        language\n        name\n        handle\n        siteTitle\n        siteDescription\n      }\n    }\n    menuContent: globalSet(site: $site, handle: "menuContent") {\n      ... on menuContent_GlobalSet {\n        helpUrl\n      }\n    }\n  }\n':
    types.GlobalsQueryDocument,
  "\n  query HomepageQuery($site: [String], $uri: [String]) {\n    entry(site: $site, uri: $uri) {\n      __typename\n      ...HomepageTemplate\n    }\n  }\n":
    types.HomepageQueryDocument,
  "\n  query PagePreviewQuery($site: [String], $uri: [String]) {\n    entry(site: $site, uri: $uri) {\n      __typename\n      uri\n      title\n    }\n  }\n":
    types.PagePreviewQueryDocument,
  "\n  query FacebookOauthUrl {\n    facebookOauthUrl\n  }\n":
    types.FacebookOauthUrlDocument,
  "\n  mutation GoogleSignInStudent($idToken: String!) {\n    googleSignInStudents(idToken: $idToken) {\n      ...AuthFragment\n    }\n  }\n":
    types.GoogleSignInStudentDocument,
  "\n  mutation GoogleSignInEducator($idToken: String!) {\n    googleSignInEducators(idToken: $idToken) {\n      ...AuthFragment\n    }\n  }\n":
    types.GoogleSignInEducatorDocument,
  "\n  mutation ActivateUser($code: String!, $id: String!) {\n    activateUser(code: $code, id: $id)\n  }\n":
    types.ActivateUserDocument,
  "\n  mutation ForgottenPassword($email: String!) {\n    forgottenPassword(email: $email)\n  }\n":
    types.ForgottenPasswordDocument,
  "\n  mutation SetPassword($password: String!, $code: String!, $id: String!) {\n    setPassword(password: $password, code: $code, id: $id)\n  }\n":
    types.SetPasswordDocument,
  "\n  mutation Authenticate($email: String!, $password: String!) {\n    authenticate(email: $email, password: $password) {\n      ...AuthFragment\n    }\n  }\n":
    types.AuthenticateDocument,
  "\n  mutation FacebookSignInStudent($code: String!) {\n    facebookSignInStudents(code: $code) {\n      ...AuthFragment\n    }\n  }\n":
    types.FacebookSignInStudentDocument,
  "\n  mutation FacebookSignInEducator($code: String!) {\n    facebookSignInEducators(code: $code) {\n      ...AuthFragment\n    }\n  }\n":
    types.FacebookSignInEducatorDocument,
  "\n  mutation RegisterEducator(\n    $email: String!\n    $password: String!\n    $fullName: String\n  ) {\n    registerEducators(email: $email, password: $password, fullName: $fullName) {\n      ...AuthFragment\n    }\n  }\n":
    types.RegisterEducatorDocument,
  "\n  mutation RegisterStudent(\n    $email: String!\n    $password: String!\n    $fullName: String\n  ) {\n    registerStudents(email: $email, password: $password, fullName: $fullName) {\n      ...AuthFragment\n    }\n  }\n":
    types.RegisterStudentDocument,
  "\n  mutation RefreshToken($refreshToken: String!) {\n    refreshToken(refreshToken: $refreshToken) {\n      ...AuthFragment\n    }\n  }\n":
    types.RefreshTokenDocument,
  "\n  fragment BarGraphToolBlock on contentBlocks_barGraphTool_BlockType {\n    __typename\n    id\n    title\n    yAxisMin\n    yAxisMax\n    yAxisLabel\n    xAxisLabel\n    graphBars {\n      ... on graphBars_bar_BlockType {\n        __typename\n        yValue\n        label\n      }\n    }\n  }\n":
    types.BarGraphToolBlockFragmentDoc,
  "\n  fragment CameraFilterToolBlock on contentBlocks_cameraFilterTool_BlockType {\n    widgetInstructions\n  }\n":
    types.CameraFilterToolBlockFragmentDoc,
  "\n  fragment ColorFilterToolBlock on contentBlocks_colorFilterToolBlock_BlockType {\n    colorFilterTool {\n      ...ColorFilterToolEntry\n    }\n  }\n":
    types.ColorFilterToolBlockFragmentDoc,
  "\n  fragment EquationBlock on contentBlocks_equation_BlockType {\n    id\n    latex\n  }\n":
    types.EquationBlockFragmentDoc,
  "\n  fragment FilterToolBlock on contentBlocks_filterTool_BlockType {\n    __typename\n    id\n    preSelectedColor\n    readOnly\n    widgetInstructions\n  }\n":
    types.FilterToolBlockFragmentDoc,
  "\n  fragment ImageBlock on contentBlocks_image_BlockType {\n    id\n    caption\n    layout\n    image {\n      url {\n        directUrlPreview\n        directUrlOriginal\n        PNG\n        HighJPG\n        LowJPG\n        preview\n      }\n      width\n      height\n      metadata: additional {\n        AltTextEN\n        AltTextES\n        CaptionEN\n        CaptionES\n        Credit\n      }\n    }\n  }\n":
    types.ImageBlockFragmentDoc,
  "\n  fragment InteractionGroupContainerBlock on contentBlocks_group_BlockType {\n    __typename\n    childBlocks: children {\n      __typename\n      id\n      ...TextBlock\n      ...ImageBlock\n      ...VideoBlock\n      ...TableBlock\n      ...QuestionsBlock\n      ...BarGraphToolBlock\n      ...FilterToolBlock\n      ...ScatterplotToolBlock\n      ...ReferenceModalBlock\n      ...ColorFilterToolBlock\n      ...SupernovaDistanceDistributionBlock\n      ...MagnitudeScatterPlotBlock\n    }\n  }\n":
    types.InteractionGroupContainerBlockFragmentDoc,
  "\n  fragment InvestigationGridBlock on homepageContentBlocks_investigationGrid_BlockType {\n    heading: contentHeading\n    investigations: investigationEntries {\n      ... on investigations_investigationParent_Entry {\n        id\n        title\n        rawImage: image {\n          url {\n            directUrlPreview\n            directUrlOriginal\n            PNG\n            HighJPG\n            LowJPG\n          }\n          width\n          height\n          metadata: additional {\n            AltTextEN\n            AltTextES\n            CaptionEN\n            CaptionES\n            Credit\n          }\n        }\n        url\n      }\n    }\n  }\n":
    types.InvestigationGridBlockFragmentDoc,
  "\n  fragment MagnitudeScatterPlotBlock on contentBlocks_magnitudeScatterPlot_BlockType {\n    lightCurveTool {\n      ... on widgets_lightCurveTool_Entry {\n        displayName\n        dataset {\n          ... on datasets_supernovaGalaxyObservations_Entry {\n            title\n            peakMjd: mjd\n            json {\n              ... on datasets_Asset {\n                url\n              }\n            }\n          }\n        }\n        yMin: yAxisMin\n        yMax: yAxisMax\n      }\n    }\n  }\n":
    types.MagnitudeScatterPlotBlockFragmentDoc,
  "\n  fragment ReferenceModalBlock on contentBlocks_referenceModalBlock_BlockType {\n    referenceModalEntries {\n      ... on referenceModals_default_Entry {\n        title\n        uri\n      }\n    }\n  }\n":
    types.ReferenceModalBlockFragmentDoc,
  "\n  fragment QuestionsBlock on contentBlocks_questionBlock_BlockType {\n    __typename\n    id\n    questionEntries {\n      ...QuestionEntry\n    }\n  }\n":
    types.QuestionsBlockFragmentDoc,
  "\n  fragment ScatterplotToolBlock on contentBlocks_scatterplotTool_BlockType {\n    id\n    title\n    xAxisMin\n    yAxisMax\n    yAxisLabel\n    xAxisLabel\n    scatterplotItems {\n      ... on scatterplotItems_item_BlockType {\n        xValue\n        yValue\n        itemLabel\n      }\n    }\n  }\n":
    types.ScatterplotToolBlockFragmentDoc,
  "\n  fragment SupernovaDistanceDistributionBlock on contentBlocks_supernovaDistanceDistribution_BlockType {\n    instructions: widgetInstructions\n    imageAlbum {\n      url {\n        directUrlPreview\n        directUrlOriginal\n      }\n      width\n      height\n      name\n    }\n    json {\n      ... on datasets_Asset {\n        url\n      }\n    }\n    step: binSize\n    userData: dataset {\n      ... on datasets_supernovaGalaxyObservations_Entry {\n        id: title\n        distance\n        lat: galacticLatitude\n        long: galacticLongitude\n      }\n    }\n  }\n":
    types.SupernovaDistanceDistributionBlockFragmentDoc,
  "\n  fragment TableBlock on contentBlocks_table_BlockType {\n    id\n    caption\n    contentHeading\n    displayTable {\n      ... on displayTable_BlockType {\n        tableRow {\n          ... on tableRow_tableCell_BlockType {\n            id\n            cellContent\n            rowHeader\n          }\n        }\n      }\n    }\n  }\n":
    types.TableBlockFragmentDoc,
  "\n  fragment TextBlock on contentBlocks_text_BlockType {\n    id\n    text\n  }\n":
    types.TextBlockFragmentDoc,
  "\n  fragment TwoColumnContainerBlock on contentBlocks_twoColumnContainer_BlockType {\n    columns: children {\n      ... on contentBlocks_colLeft_BlockType {\n        __typename\n        id\n        childblocks: children {\n          __typename\n          id\n          ...TextBlock\n          ...ImageBlock\n          ...TableBlock\n          ...VideoBlock\n          ...QuestionsBlock\n          ...BarGraphToolBlock\n          ...FilterToolBlock\n          ...ScatterplotToolBlock\n          ...ReferenceModalBlock\n          ...ColorFilterToolBlock\n          ...SupernovaDistanceDistributionBlock\n          ...MagnitudeScatterPlotBlock\n        }\n      }\n      ... on contentBlocks_colRight_BlockType {\n        __typename\n        id\n        childblocks: children {\n          __typename\n          id\n          ...TextBlock\n          ...ImageBlock\n          ...TableBlock\n          ...VideoBlock\n          ...QuestionsBlock\n          ...BarGraphToolBlock\n          ...FilterToolBlock\n          ...ScatterplotToolBlock\n          ...ReferenceModalBlock\n          ...ColorFilterToolBlock\n          ...SupernovaDistanceDistributionBlock\n          ...MagnitudeScatterPlotBlock\n        }\n      }\n    }\n  }\n":
    types.TwoColumnContainerBlockFragmentDoc,
  "\n  fragment VideoBlock on contentBlocks_video_BlockType {\n    id\n    caption\n    video {\n      url {\n        directUrlPreview\n        directUrlPreviewPlay\n      }\n      width\n      height\n      metadata: additional {\n        CaptionEN\n        CaptionES\n        Credit\n      }\n    }\n  }\n":
    types.VideoBlockFragmentDoc,
  "\n  fragment ColorFilterToolEntry on widgets_colorFilterTool_Entry {\n    id\n    title\n    displayName\n    filterToolActions\n    filterColorOptionsLabels: filterColorOptions(label: true)\n    filterColorOptionsValues: filterColorOptions(label: false)\n    colorFilterToolObjects {\n      ... on colorFilterToolObjects_group_BlockType {\n        groupName\n        objects: children {\n          ... on colorFilterToolObjects_object_BlockType {\n            name: objectName\n            caption: objectCaption\n            filterImages: children {\n              ... on colorFilterToolObjects_filterimage_BlockType {\n                isEnabled\n                isActive\n                image {\n                  url {\n                    directUrlPreview\n                  }\n                  width\n                  height\n                }\n                max: colorToolMax\n                min: colorToolMin\n                defaultValue: colorToolDefaultValue\n                label: filter\n                color: preSelectedColor\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n":
    types.ColorFilterToolEntryFragmentDoc,
  "\n  fragment SourceSelectorEntry on widgets_sourceSelector_Entry {\n    id\n    title\n    displayName\n    dataset {\n      ... on datasets_supernovaGalaxyObservations_Entry {\n        id\n        sources: alertSources {\n          ... on alertSources_source_BlockType {\n            color\n            x: xCoord\n            y: yCoord\n            radius\n            type: sourceType\n            id: sourceName\n          }\n        }\n        galacticLongitude\n        json {\n          ... on datasets_Asset {\n            url\n          }\n        }\n        imageAlbum {\n          url {\n            directUrlOriginal\n          }\n          width\n          height\n        }\n      }\n    }\n  }\n":
    types.SourceSelectorEntryFragmentDoc,
  "\n  fragment ContentBlockFactory on contentBlocks_NeoField {\n    __typename\n    ...TwoColumnContainerBlock\n    ...InteractionGroupContainerBlock\n    ...TextBlock\n    ...ImageBlock\n    ...VideoBlock\n    ...TableBlock\n    ...QuestionsBlock\n    ...BarGraphToolBlock\n    ...FilterToolBlock\n    ...ScatterplotToolBlock\n    ...ReferenceModalBlock\n    ...ColorFilterToolBlock\n    ...CameraFilterToolBlock\n    ...EquationBlock\n    ...SupernovaDistanceDistributionBlock\n  }\n":
    types.ContentBlockFactoryFragmentDoc,
  "\n  fragment QuestionEntry on questions_default_Entry {\n    __typename\n    id\n    answerType\n    ...TabularQuestion\n    options: answerOptions {\n      ... on answerOptions_option_BlockType {\n        label: optionLabel\n        value: optionValue\n      }\n    }\n    id\n    questionText\n    widgetInstructions\n    questionWidgetsBlock {\n      __typename\n      ... on questionWidgetsBlock_colorFilterToolBlock_BlockType {\n        typeHandle\n        colorFilterTool {\n          ...ColorFilterToolEntry\n        }\n      }\n      ... on questionWidgetsBlock_sourceSelectorBlock_BlockType {\n        typeHandle\n        sourceSelector {\n          ...SourceSelectorEntry\n        }\n      }\n    }\n    parts: multiPartBlocks {\n      ... on multiPartBlocks_select_BlockType {\n        id\n        type: typeHandle\n        options: answerOptions {\n          ... on answerOptions_option_BlockType {\n            id\n            label: optionLabel\n            value: optionValue\n          }\n        }\n      }\n      ... on multiPartBlocks_text_BlockType {\n        id\n        type: typeHandle\n      }\n      ... on multiPartBlocks_multiselect_BlockType {\n        id\n        type: typeHandle\n        options: answerOptions {\n          ... on answerOptions_option_BlockType {\n            id\n            label: optionLabel\n            value: optionValue\n          }\n        }\n      }\n      ... on multiPartBlocks_readonlyText_BlockType {\n        id\n        type: typeHandle\n        text: questionText\n      }\n    }\n  }\n":
    types.QuestionEntryFragmentDoc,
  "\n  fragment TemplateFactory on EntryInterface {\n    __typename\n    ...PageTemplate\n  }\n":
    types.TemplateFactoryFragmentDoc,
  "\n  fragment ColorFilterToolQuestion on contentBlocks_colorFilterToolBlock_BlockType {\n    colorFilterTool {\n      ...ColorFilterToolEntry\n    }\n  }\n":
    types.ColorFilterToolQuestionFragmentDoc,
  "\n  fragment SourceSelectorQuestion on questionWidgetsBlock_sourceSelectorBlock_BlockType {\n    __typename\n    sourceSelector {\n      ...SourceSelectorEntry\n    }\n  }\n":
    types.SourceSelectorQuestionFragmentDoc,
  "\n  fragment TableRows on questions_default_Entry {\n    id\n    rows: questionTable {\n      ... on questionTable_BlockType {\n        id\n        tableCell {\n          ... on tableCell_question_BlockType {\n            id\n            answerType\n          }\n          ... on tableCell_text_BlockType {\n            id\n            equation\n            text\n            header\n          }\n        }\n      }\n    }\n  }\n":
    types.TableRowsFragmentDoc,
  "\n  fragment TabularQuestion on questions_default_Entry {\n    id\n    questionText\n    ...TableRows\n  }\n":
    types.TabularQuestionFragmentDoc,
  "\n  fragment HomepageTemplate on homepage_homepage_Entry {\n    __typename\n    id\n    title\n    contentBlocks: homepageContentBlocks {\n      __typename\n      ... on homepageContentBlocks_text_BlockType {\n        id\n        text\n      }\n      ... on homepageContentBlocks_image_BlockType {\n        id\n        caption\n        layout\n        image {\n          url {\n            directUrlPreview\n            directUrlOriginal\n            PNG\n            HighJPG\n            LowJPG\n            preview\n          }\n          width\n          height\n          metadata: additional {\n            AltTextEN\n            AltTextES\n            CaptionEN\n            CaptionES\n            Credit\n          }\n        }\n      }\n      ...InvestigationGridBlock\n    }\n  }\n":
    types.HomepageTemplateFragmentDoc,
  "\n  fragment InvestigationChildPageTemplate on investigations_default_Entry {\n    __typename\n    id\n    title\n    contentBlocks {\n      ...ContentBlockFactory\n    }\n    hasSavePoint\n    parent {\n      id\n    }\n  }\n":
    types.InvestigationChildPageTemplateFragmentDoc,
  "\n  fragment InvestigationLandingPageTemplate on investigations_investigationParent_Entry {\n    title\n    image {\n      url {\n        directUrlPreview\n        directUrlOriginal\n        PNG\n        HighJPG\n        LowJPG\n      }\n      width\n      height\n      metadata: additional {\n        AltTextEN\n        AltTextES\n        CaptionEN\n        CaptionES\n        Credit\n      }\n    }\n    children {\n      uri\n    }\n  }\n":
    types.InvestigationLandingPageTemplateFragmentDoc,
  '\n  fragment InvestigationSectionBreakTemplate on investigations_investigationSectionBreakChild_Entry {\n    __typename\n    id\n    title\n    text\n    next(section: "investigations") {\n      __typename\n      uri\n    }\n  }\n':
    types.InvestigationSectionBreakTemplateFragmentDoc,
  "\n  fragment PageTemplate on pages_pages_Entry {\n    id\n    title\n    contentBlocks {\n      ...ContentBlockFactory\n    }\n  }\n":
    types.PageTemplateFragmentDoc,
  "\n  fragment ReferenceContentTemplate on referenceModals_default_Entry {\n    __typename\n    title\n    id\n    contentBlocks: referenceContentBlocks {\n      __typename\n      ... on referenceContentBlocks_text_BlockType {\n        id\n        text\n      }\n      ... on referenceContentBlocks_image_BlockType {\n        id\n        caption\n        layout\n        image {\n          url {\n            directUrlPreview\n            directUrlOriginal\n            PNG\n            HighJPG\n            LowJPG\n            preview\n          }\n          width\n          height\n          metadata: additional {\n            AltTextEN\n            AltTextES\n            CaptionEN\n            CaptionES\n            Credit\n          }\n        }\n      }\n      ... on referenceContentBlocks_table_BlockType {\n        id\n        caption\n        contentHeading\n        displayTable {\n          ... on displayTable_BlockType {\n            tableRow {\n              ... on tableRow_tableCell_BlockType {\n                id\n                cellContent\n                rowHeader\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n":
    types.ReferenceContentTemplateFragmentDoc,
  "fragment AuthFragment on Auth {\n  jwt\n  jwtExpiresAt\n  refreshToken\n  refreshTokenExpiresAt\n  user {\n    ...UserFragment\n  }\n}":
    types.AuthFragmentFragmentDoc,
  "fragment UserFragment on UserInterface {\n  id\n  status\n}":
    types.UserFragmentFragmentDoc,
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
export function graphql(
  source: "\n  query ReferenceContent($site: [String], $uri: [String]) {\n    entry(site: $site, uri: $uri) {\n      ...ReferenceContentTemplate\n    }\n  }\n"
): (typeof documents)["\n  query ReferenceContent($site: [String], $uri: [String]) {\n    entry(site: $site, uri: $uri) {\n      ...ReferenceContentTemplate\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query InvestigationChildPage($site: [String], $uri: [String]) {\n    entry(site: $site, uri: $uri) {\n      ...InvestigationChildPageTemplate\n      ...InvestigationSectionBreakTemplate\n    }\n  }\n"
): (typeof documents)["\n  query InvestigationChildPage($site: [String], $uri: [String]) {\n    entry(site: $site, uri: $uri) {\n      ...InvestigationChildPageTemplate\n      ...InvestigationSectionBreakTemplate\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query InvestigationChildPageMetadata($site: [String], $uri: [String]) {\n    entry(site: $site, uri: $uri) {\n      title\n    }\n  }\n"
): (typeof documents)["\n  query InvestigationChildPageMetadata($site: [String], $uri: [String]) {\n    entry(site: $site, uri: $uri) {\n      title\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query InvestigationMetadata($site: [String], $uri: [String]) {\n    entry(site: $site, uri: $uri) {\n      ... on investigations_investigationParent_Entry {\n        title\n      }\n    }\n  }\n"
): (typeof documents)["\n  query InvestigationMetadata($site: [String], $uri: [String]) {\n    entry(site: $site, uri: $uri) {\n      ... on investigations_investigationParent_Entry {\n        title\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query InvestigationId($site: [String], $uri: [String]) {\n    entry(site: $site, uri: $uri) {\n      ... on investigations_investigationParent_Entry {\n        __typename\n        id\n        acknowledgements: text\n        children {\n          __typename\n          title\n          id\n          uri\n          ... on investigations_default_Entry {\n            hasSavePoint\n            contentBlocks {\n              __typename\n              ...QuestionsBlock\n              ... on contentBlocks_twoColumnContainer_BlockType {\n                columns: children {\n                  __typename\n                  ... on contentBlocks_colLeft_BlockType {\n                    children {\n                      ...QuestionsBlock\n                      ... on contentBlocks_group_BlockType {\n                        group: children {\n                          ...QuestionsBlock\n                        }\n                      }\n                    }\n                  }\n                  ... on contentBlocks_colRight_BlockType {\n                    children {\n                      __typename\n                      ...QuestionsBlock\n                      ... on contentBlocks_group_BlockType {\n                        group: children {\n                          ... on contentBlocks_questionBlock_BlockType {\n                            __typename\n                            questionEntries {\n                              ...QuestionEntry\n                            }\n                          }\n                        }\n                      }\n                    }\n                  }\n                }\n              }\n              ... on contentBlocks_group_BlockType {\n                group: children {\n                  ...QuestionsBlock\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  query InvestigationId($site: [String], $uri: [String]) {\n    entry(site: $site, uri: $uri) {\n      ... on investigations_investigationParent_Entry {\n        __typename\n        id\n        acknowledgements: text\n        children {\n          __typename\n          title\n          id\n          uri\n          ... on investigations_default_Entry {\n            hasSavePoint\n            contentBlocks {\n              __typename\n              ...QuestionsBlock\n              ... on contentBlocks_twoColumnContainer_BlockType {\n                columns: children {\n                  __typename\n                  ... on contentBlocks_colLeft_BlockType {\n                    children {\n                      ...QuestionsBlock\n                      ... on contentBlocks_group_BlockType {\n                        group: children {\n                          ...QuestionsBlock\n                        }\n                      }\n                    }\n                  }\n                  ... on contentBlocks_colRight_BlockType {\n                    children {\n                      __typename\n                      ...QuestionsBlock\n                      ... on contentBlocks_group_BlockType {\n                        group: children {\n                          ... on contentBlocks_questionBlock_BlockType {\n                            __typename\n                            questionEntries {\n                              ...QuestionEntry\n                            }\n                          }\n                        }\n                      }\n                    }\n                  }\n                }\n              }\n              ... on contentBlocks_group_BlockType {\n                group: children {\n                  ...QuestionsBlock\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query InvestigationPage($site: [String], $uri: [String]) {\n    entry(site: $site, uri: $uri) {\n      __typename\n      ...InvestigationLandingPageTemplate\n    }\n  }\n"
): (typeof documents)["\n  query InvestigationPage($site: [String], $uri: [String]) {\n    entry(site: $site, uri: $uri) {\n      __typename\n      ...InvestigationLandingPageTemplate\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query ReviewPage($site: [String], $uri: [String]) {\n    entry(site: $site, uri: $uri) {\n      ... on investigations_investigationParent_Entry {\n        title\n      }\n    }\n  }\n"
): (typeof documents)["\n  query ReviewPage($site: [String], $uri: [String]) {\n    entry(site: $site, uri: $uri) {\n      ... on investigations_investigationParent_Entry {\n        title\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GlobalsQuery($site: [String]) {\n    siteInfo: globalSet(site: $site, handle: "siteInfo") {\n      ... on siteInfo_GlobalSet {\n        language\n        name\n        handle\n        siteTitle\n        siteDescription\n      }\n    }\n    menuContent: globalSet(site: $site, handle: "menuContent") {\n      ... on menuContent_GlobalSet {\n        helpUrl\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GlobalsQuery($site: [String]) {\n    siteInfo: globalSet(site: $site, handle: "siteInfo") {\n      ... on siteInfo_GlobalSet {\n        language\n        name\n        handle\n        siteTitle\n        siteDescription\n      }\n    }\n    menuContent: globalSet(site: $site, handle: "menuContent") {\n      ... on menuContent_GlobalSet {\n        helpUrl\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query HomepageQuery($site: [String], $uri: [String]) {\n    entry(site: $site, uri: $uri) {\n      __typename\n      ...HomepageTemplate\n    }\n  }\n"
): (typeof documents)["\n  query HomepageQuery($site: [String], $uri: [String]) {\n    entry(site: $site, uri: $uri) {\n      __typename\n      ...HomepageTemplate\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query PagePreviewQuery($site: [String], $uri: [String]) {\n    entry(site: $site, uri: $uri) {\n      __typename\n      uri\n      title\n    }\n  }\n"
): (typeof documents)["\n  query PagePreviewQuery($site: [String], $uri: [String]) {\n    entry(site: $site, uri: $uri) {\n      __typename\n      uri\n      title\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query FacebookOauthUrl {\n    facebookOauthUrl\n  }\n"
): (typeof documents)["\n  query FacebookOauthUrl {\n    facebookOauthUrl\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation GoogleSignInStudent($idToken: String!) {\n    googleSignInStudents(idToken: $idToken) {\n      ...AuthFragment\n    }\n  }\n"
): (typeof documents)["\n  mutation GoogleSignInStudent($idToken: String!) {\n    googleSignInStudents(idToken: $idToken) {\n      ...AuthFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation GoogleSignInEducator($idToken: String!) {\n    googleSignInEducators(idToken: $idToken) {\n      ...AuthFragment\n    }\n  }\n"
): (typeof documents)["\n  mutation GoogleSignInEducator($idToken: String!) {\n    googleSignInEducators(idToken: $idToken) {\n      ...AuthFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation ActivateUser($code: String!, $id: String!) {\n    activateUser(code: $code, id: $id)\n  }\n"
): (typeof documents)["\n  mutation ActivateUser($code: String!, $id: String!) {\n    activateUser(code: $code, id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation ForgottenPassword($email: String!) {\n    forgottenPassword(email: $email)\n  }\n"
): (typeof documents)["\n  mutation ForgottenPassword($email: String!) {\n    forgottenPassword(email: $email)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation SetPassword($password: String!, $code: String!, $id: String!) {\n    setPassword(password: $password, code: $code, id: $id)\n  }\n"
): (typeof documents)["\n  mutation SetPassword($password: String!, $code: String!, $id: String!) {\n    setPassword(password: $password, code: $code, id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation Authenticate($email: String!, $password: String!) {\n    authenticate(email: $email, password: $password) {\n      ...AuthFragment\n    }\n  }\n"
): (typeof documents)["\n  mutation Authenticate($email: String!, $password: String!) {\n    authenticate(email: $email, password: $password) {\n      ...AuthFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation FacebookSignInStudent($code: String!) {\n    facebookSignInStudents(code: $code) {\n      ...AuthFragment\n    }\n  }\n"
): (typeof documents)["\n  mutation FacebookSignInStudent($code: String!) {\n    facebookSignInStudents(code: $code) {\n      ...AuthFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation FacebookSignInEducator($code: String!) {\n    facebookSignInEducators(code: $code) {\n      ...AuthFragment\n    }\n  }\n"
): (typeof documents)["\n  mutation FacebookSignInEducator($code: String!) {\n    facebookSignInEducators(code: $code) {\n      ...AuthFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation RegisterEducator(\n    $email: String!\n    $password: String!\n    $fullName: String\n  ) {\n    registerEducators(email: $email, password: $password, fullName: $fullName) {\n      ...AuthFragment\n    }\n  }\n"
): (typeof documents)["\n  mutation RegisterEducator(\n    $email: String!\n    $password: String!\n    $fullName: String\n  ) {\n    registerEducators(email: $email, password: $password, fullName: $fullName) {\n      ...AuthFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation RegisterStudent(\n    $email: String!\n    $password: String!\n    $fullName: String\n  ) {\n    registerStudents(email: $email, password: $password, fullName: $fullName) {\n      ...AuthFragment\n    }\n  }\n"
): (typeof documents)["\n  mutation RegisterStudent(\n    $email: String!\n    $password: String!\n    $fullName: String\n  ) {\n    registerStudents(email: $email, password: $password, fullName: $fullName) {\n      ...AuthFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation RefreshToken($refreshToken: String!) {\n    refreshToken(refreshToken: $refreshToken) {\n      ...AuthFragment\n    }\n  }\n"
): (typeof documents)["\n  mutation RefreshToken($refreshToken: String!) {\n    refreshToken(refreshToken: $refreshToken) {\n      ...AuthFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment BarGraphToolBlock on contentBlocks_barGraphTool_BlockType {\n    __typename\n    id\n    title\n    yAxisMin\n    yAxisMax\n    yAxisLabel\n    xAxisLabel\n    graphBars {\n      ... on graphBars_bar_BlockType {\n        __typename\n        yValue\n        label\n      }\n    }\n  }\n"
): (typeof documents)["\n  fragment BarGraphToolBlock on contentBlocks_barGraphTool_BlockType {\n    __typename\n    id\n    title\n    yAxisMin\n    yAxisMax\n    yAxisLabel\n    xAxisLabel\n    graphBars {\n      ... on graphBars_bar_BlockType {\n        __typename\n        yValue\n        label\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment CameraFilterToolBlock on contentBlocks_cameraFilterTool_BlockType {\n    widgetInstructions\n  }\n"
): (typeof documents)["\n  fragment CameraFilterToolBlock on contentBlocks_cameraFilterTool_BlockType {\n    widgetInstructions\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment ColorFilterToolBlock on contentBlocks_colorFilterToolBlock_BlockType {\n    colorFilterTool {\n      ...ColorFilterToolEntry\n    }\n  }\n"
): (typeof documents)["\n  fragment ColorFilterToolBlock on contentBlocks_colorFilterToolBlock_BlockType {\n    colorFilterTool {\n      ...ColorFilterToolEntry\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment EquationBlock on contentBlocks_equation_BlockType {\n    id\n    latex\n  }\n"
): (typeof documents)["\n  fragment EquationBlock on contentBlocks_equation_BlockType {\n    id\n    latex\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment FilterToolBlock on contentBlocks_filterTool_BlockType {\n    __typename\n    id\n    preSelectedColor\n    readOnly\n    widgetInstructions\n  }\n"
): (typeof documents)["\n  fragment FilterToolBlock on contentBlocks_filterTool_BlockType {\n    __typename\n    id\n    preSelectedColor\n    readOnly\n    widgetInstructions\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment ImageBlock on contentBlocks_image_BlockType {\n    id\n    caption\n    layout\n    image {\n      url {\n        directUrlPreview\n        directUrlOriginal\n        PNG\n        HighJPG\n        LowJPG\n        preview\n      }\n      width\n      height\n      metadata: additional {\n        AltTextEN\n        AltTextES\n        CaptionEN\n        CaptionES\n        Credit\n      }\n    }\n  }\n"
): (typeof documents)["\n  fragment ImageBlock on contentBlocks_image_BlockType {\n    id\n    caption\n    layout\n    image {\n      url {\n        directUrlPreview\n        directUrlOriginal\n        PNG\n        HighJPG\n        LowJPG\n        preview\n      }\n      width\n      height\n      metadata: additional {\n        AltTextEN\n        AltTextES\n        CaptionEN\n        CaptionES\n        Credit\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment InteractionGroupContainerBlock on contentBlocks_group_BlockType {\n    __typename\n    childBlocks: children {\n      __typename\n      id\n      ...TextBlock\n      ...ImageBlock\n      ...VideoBlock\n      ...TableBlock\n      ...QuestionsBlock\n      ...BarGraphToolBlock\n      ...FilterToolBlock\n      ...ScatterplotToolBlock\n      ...ReferenceModalBlock\n      ...ColorFilterToolBlock\n      ...SupernovaDistanceDistributionBlock\n      ...MagnitudeScatterPlotBlock\n    }\n  }\n"
): (typeof documents)["\n  fragment InteractionGroupContainerBlock on contentBlocks_group_BlockType {\n    __typename\n    childBlocks: children {\n      __typename\n      id\n      ...TextBlock\n      ...ImageBlock\n      ...VideoBlock\n      ...TableBlock\n      ...QuestionsBlock\n      ...BarGraphToolBlock\n      ...FilterToolBlock\n      ...ScatterplotToolBlock\n      ...ReferenceModalBlock\n      ...ColorFilterToolBlock\n      ...SupernovaDistanceDistributionBlock\n      ...MagnitudeScatterPlotBlock\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment InvestigationGridBlock on homepageContentBlocks_investigationGrid_BlockType {\n    heading: contentHeading\n    investigations: investigationEntries {\n      ... on investigations_investigationParent_Entry {\n        id\n        title\n        rawImage: image {\n          url {\n            directUrlPreview\n            directUrlOriginal\n            PNG\n            HighJPG\n            LowJPG\n          }\n          width\n          height\n          metadata: additional {\n            AltTextEN\n            AltTextES\n            CaptionEN\n            CaptionES\n            Credit\n          }\n        }\n        url\n      }\n    }\n  }\n"
): (typeof documents)["\n  fragment InvestigationGridBlock on homepageContentBlocks_investigationGrid_BlockType {\n    heading: contentHeading\n    investigations: investigationEntries {\n      ... on investigations_investigationParent_Entry {\n        id\n        title\n        rawImage: image {\n          url {\n            directUrlPreview\n            directUrlOriginal\n            PNG\n            HighJPG\n            LowJPG\n          }\n          width\n          height\n          metadata: additional {\n            AltTextEN\n            AltTextES\n            CaptionEN\n            CaptionES\n            Credit\n          }\n        }\n        url\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment MagnitudeScatterPlotBlock on contentBlocks_magnitudeScatterPlot_BlockType {\n    lightCurveTool {\n      ... on widgets_lightCurveTool_Entry {\n        displayName\n        dataset {\n          ... on datasets_supernovaGalaxyObservations_Entry {\n            title\n            peakMjd: mjd\n            json {\n              ... on datasets_Asset {\n                url\n              }\n            }\n          }\n        }\n        yMin: yAxisMin\n        yMax: yAxisMax\n      }\n    }\n  }\n"
): (typeof documents)["\n  fragment MagnitudeScatterPlotBlock on contentBlocks_magnitudeScatterPlot_BlockType {\n    lightCurveTool {\n      ... on widgets_lightCurveTool_Entry {\n        displayName\n        dataset {\n          ... on datasets_supernovaGalaxyObservations_Entry {\n            title\n            peakMjd: mjd\n            json {\n              ... on datasets_Asset {\n                url\n              }\n            }\n          }\n        }\n        yMin: yAxisMin\n        yMax: yAxisMax\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment ReferenceModalBlock on contentBlocks_referenceModalBlock_BlockType {\n    referenceModalEntries {\n      ... on referenceModals_default_Entry {\n        title\n        uri\n      }\n    }\n  }\n"
): (typeof documents)["\n  fragment ReferenceModalBlock on contentBlocks_referenceModalBlock_BlockType {\n    referenceModalEntries {\n      ... on referenceModals_default_Entry {\n        title\n        uri\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment QuestionsBlock on contentBlocks_questionBlock_BlockType {\n    __typename\n    id\n    questionEntries {\n      ...QuestionEntry\n    }\n  }\n"
): (typeof documents)["\n  fragment QuestionsBlock on contentBlocks_questionBlock_BlockType {\n    __typename\n    id\n    questionEntries {\n      ...QuestionEntry\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment ScatterplotToolBlock on contentBlocks_scatterplotTool_BlockType {\n    id\n    title\n    xAxisMin\n    yAxisMax\n    yAxisLabel\n    xAxisLabel\n    scatterplotItems {\n      ... on scatterplotItems_item_BlockType {\n        xValue\n        yValue\n        itemLabel\n      }\n    }\n  }\n"
): (typeof documents)["\n  fragment ScatterplotToolBlock on contentBlocks_scatterplotTool_BlockType {\n    id\n    title\n    xAxisMin\n    yAxisMax\n    yAxisLabel\n    xAxisLabel\n    scatterplotItems {\n      ... on scatterplotItems_item_BlockType {\n        xValue\n        yValue\n        itemLabel\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment SupernovaDistanceDistributionBlock on contentBlocks_supernovaDistanceDistribution_BlockType {\n    instructions: widgetInstructions\n    imageAlbum {\n      url {\n        directUrlPreview\n        directUrlOriginal\n      }\n      width\n      height\n      name\n    }\n    json {\n      ... on datasets_Asset {\n        url\n      }\n    }\n    step: binSize\n    userData: dataset {\n      ... on datasets_supernovaGalaxyObservations_Entry {\n        id: title\n        distance\n        lat: galacticLatitude\n        long: galacticLongitude\n      }\n    }\n  }\n"
): (typeof documents)["\n  fragment SupernovaDistanceDistributionBlock on contentBlocks_supernovaDistanceDistribution_BlockType {\n    instructions: widgetInstructions\n    imageAlbum {\n      url {\n        directUrlPreview\n        directUrlOriginal\n      }\n      width\n      height\n      name\n    }\n    json {\n      ... on datasets_Asset {\n        url\n      }\n    }\n    step: binSize\n    userData: dataset {\n      ... on datasets_supernovaGalaxyObservations_Entry {\n        id: title\n        distance\n        lat: galacticLatitude\n        long: galacticLongitude\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment TableBlock on contentBlocks_table_BlockType {\n    id\n    caption\n    contentHeading\n    displayTable {\n      ... on displayTable_BlockType {\n        tableRow {\n          ... on tableRow_tableCell_BlockType {\n            id\n            cellContent\n            rowHeader\n          }\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  fragment TableBlock on contentBlocks_table_BlockType {\n    id\n    caption\n    contentHeading\n    displayTable {\n      ... on displayTable_BlockType {\n        tableRow {\n          ... on tableRow_tableCell_BlockType {\n            id\n            cellContent\n            rowHeader\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment TextBlock on contentBlocks_text_BlockType {\n    id\n    text\n  }\n"
): (typeof documents)["\n  fragment TextBlock on contentBlocks_text_BlockType {\n    id\n    text\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment TwoColumnContainerBlock on contentBlocks_twoColumnContainer_BlockType {\n    columns: children {\n      ... on contentBlocks_colLeft_BlockType {\n        __typename\n        id\n        childblocks: children {\n          __typename\n          id\n          ...TextBlock\n          ...ImageBlock\n          ...TableBlock\n          ...VideoBlock\n          ...QuestionsBlock\n          ...BarGraphToolBlock\n          ...FilterToolBlock\n          ...ScatterplotToolBlock\n          ...ReferenceModalBlock\n          ...ColorFilterToolBlock\n          ...SupernovaDistanceDistributionBlock\n          ...MagnitudeScatterPlotBlock\n        }\n      }\n      ... on contentBlocks_colRight_BlockType {\n        __typename\n        id\n        childblocks: children {\n          __typename\n          id\n          ...TextBlock\n          ...ImageBlock\n          ...TableBlock\n          ...VideoBlock\n          ...QuestionsBlock\n          ...BarGraphToolBlock\n          ...FilterToolBlock\n          ...ScatterplotToolBlock\n          ...ReferenceModalBlock\n          ...ColorFilterToolBlock\n          ...SupernovaDistanceDistributionBlock\n          ...MagnitudeScatterPlotBlock\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  fragment TwoColumnContainerBlock on contentBlocks_twoColumnContainer_BlockType {\n    columns: children {\n      ... on contentBlocks_colLeft_BlockType {\n        __typename\n        id\n        childblocks: children {\n          __typename\n          id\n          ...TextBlock\n          ...ImageBlock\n          ...TableBlock\n          ...VideoBlock\n          ...QuestionsBlock\n          ...BarGraphToolBlock\n          ...FilterToolBlock\n          ...ScatterplotToolBlock\n          ...ReferenceModalBlock\n          ...ColorFilterToolBlock\n          ...SupernovaDistanceDistributionBlock\n          ...MagnitudeScatterPlotBlock\n        }\n      }\n      ... on contentBlocks_colRight_BlockType {\n        __typename\n        id\n        childblocks: children {\n          __typename\n          id\n          ...TextBlock\n          ...ImageBlock\n          ...TableBlock\n          ...VideoBlock\n          ...QuestionsBlock\n          ...BarGraphToolBlock\n          ...FilterToolBlock\n          ...ScatterplotToolBlock\n          ...ReferenceModalBlock\n          ...ColorFilterToolBlock\n          ...SupernovaDistanceDistributionBlock\n          ...MagnitudeScatterPlotBlock\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment VideoBlock on contentBlocks_video_BlockType {\n    id\n    caption\n    video {\n      url {\n        directUrlPreview\n        directUrlPreviewPlay\n      }\n      width\n      height\n      metadata: additional {\n        CaptionEN\n        CaptionES\n        Credit\n      }\n    }\n  }\n"
): (typeof documents)["\n  fragment VideoBlock on contentBlocks_video_BlockType {\n    id\n    caption\n    video {\n      url {\n        directUrlPreview\n        directUrlPreviewPlay\n      }\n      width\n      height\n      metadata: additional {\n        CaptionEN\n        CaptionES\n        Credit\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment ColorFilterToolEntry on widgets_colorFilterTool_Entry {\n    id\n    title\n    displayName\n    filterToolActions\n    filterColorOptionsLabels: filterColorOptions(label: true)\n    filterColorOptionsValues: filterColorOptions(label: false)\n    colorFilterToolObjects {\n      ... on colorFilterToolObjects_group_BlockType {\n        groupName\n        objects: children {\n          ... on colorFilterToolObjects_object_BlockType {\n            name: objectName\n            caption: objectCaption\n            filterImages: children {\n              ... on colorFilterToolObjects_filterimage_BlockType {\n                isEnabled\n                isActive\n                image {\n                  url {\n                    directUrlPreview\n                  }\n                  width\n                  height\n                }\n                max: colorToolMax\n                min: colorToolMin\n                defaultValue: colorToolDefaultValue\n                label: filter\n                color: preSelectedColor\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  fragment ColorFilterToolEntry on widgets_colorFilterTool_Entry {\n    id\n    title\n    displayName\n    filterToolActions\n    filterColorOptionsLabels: filterColorOptions(label: true)\n    filterColorOptionsValues: filterColorOptions(label: false)\n    colorFilterToolObjects {\n      ... on colorFilterToolObjects_group_BlockType {\n        groupName\n        objects: children {\n          ... on colorFilterToolObjects_object_BlockType {\n            name: objectName\n            caption: objectCaption\n            filterImages: children {\n              ... on colorFilterToolObjects_filterimage_BlockType {\n                isEnabled\n                isActive\n                image {\n                  url {\n                    directUrlPreview\n                  }\n                  width\n                  height\n                }\n                max: colorToolMax\n                min: colorToolMin\n                defaultValue: colorToolDefaultValue\n                label: filter\n                color: preSelectedColor\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment ContentBlockFactory on contentBlocks_NeoField {\n    __typename\n    ...TwoColumnContainerBlock\n    ...InteractionGroupContainerBlock\n    ...TextBlock\n    ...ImageBlock\n    ...VideoBlock\n    ...TableBlock\n    ...QuestionsBlock\n    ...BarGraphToolBlock\n    ...FilterToolBlock\n    ...ScatterplotToolBlock\n    ...ReferenceModalBlock\n    ...ColorFilterToolBlock\n    ...CameraFilterToolBlock\n    ...EquationBlock\n    ...SupernovaDistanceDistributionBlock\n    ...MagnitudeScatterPlotBlock\n  }\n"
): (typeof documents)["\n  fragment ContentBlockFactory on contentBlocks_NeoField {\n    __typename\n    ...TwoColumnContainerBlock\n    ...InteractionGroupContainerBlock\n    ...TextBlock\n    ...ImageBlock\n    ...VideoBlock\n    ...TableBlock\n    ...QuestionsBlock\n    ...BarGraphToolBlock\n    ...FilterToolBlock\n    ...ScatterplotToolBlock\n    ...ReferenceModalBlock\n    ...ColorFilterToolBlock\n    ...CameraFilterToolBlock\n    ...EquationBlock\n    ...SupernovaDistanceDistributionBlock\n    ...MagnitudeScatterPlotBlock\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment ContentBlockFactory on contentBlocks_NeoField {\n    __typename\n    ...TwoColumnContainerBlock\n    ...InteractionGroupContainerBlock\n    ...TextBlock\n    ...ImageBlock\n    ...VideoBlock\n    ...TableBlock\n    ...QuestionsBlock\n    ...BarGraphToolBlock\n    ...FilterToolBlock\n    ...ScatterplotToolBlock\n    ...ReferenceModalBlock\n    ...ColorFilterToolBlock\n    ...CameraFilterToolBlock\n    ...EquationBlock\n    ...SupernovaDistanceDistributionBlock\n  }\n"
): (typeof documents)["\n  fragment ContentBlockFactory on contentBlocks_NeoField {\n    __typename\n    ...TwoColumnContainerBlock\n    ...InteractionGroupContainerBlock\n    ...TextBlock\n    ...ImageBlock\n    ...VideoBlock\n    ...TableBlock\n    ...QuestionsBlock\n    ...BarGraphToolBlock\n    ...FilterToolBlock\n    ...ScatterplotToolBlock\n    ...ReferenceModalBlock\n    ...ColorFilterToolBlock\n    ...CameraFilterToolBlock\n    ...EquationBlock\n    ...SupernovaDistanceDistributionBlock\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment QuestionEntry on questions_default_Entry {\n    __typename\n    id\n    answerType\n    ...TabularQuestion\n    options: answerOptions {\n      ... on answerOptions_option_BlockType {\n        label: optionLabel\n        value: optionValue\n      }\n    }\n    id\n    questionText\n    widgetInstructions\n    questionWidgetsBlock {\n      __typename\n      ... on questionWidgetsBlock_colorFilterToolBlock_BlockType {\n        typeHandle\n        colorFilterTool {\n          ...ColorFilterToolEntry\n        }\n      }\n      ... on questionWidgetsBlock_sourceSelectorBlock_BlockType {\n        typeHandle\n        sourceSelector {\n          ...SourceSelectorEntry\n        }\n      }\n    }\n    parts: multiPartBlocks {\n      ... on multiPartBlocks_select_BlockType {\n        id\n        type: typeHandle\n        options: answerOptions {\n          ... on answerOptions_option_BlockType {\n            id\n            label: optionLabel\n            value: optionValue\n          }\n        }\n      }\n      ... on multiPartBlocks_text_BlockType {\n        id\n        type: typeHandle\n      }\n      ... on multiPartBlocks_multiselect_BlockType {\n        id\n        type: typeHandle\n        options: answerOptions {\n          ... on answerOptions_option_BlockType {\n            id\n            label: optionLabel\n            value: optionValue\n          }\n        }\n      }\n      ... on multiPartBlocks_readonlyText_BlockType {\n        id\n        type: typeHandle\n        text: questionText\n      }\n    }\n  }\n"
): (typeof documents)["\n  fragment QuestionEntry on questions_default_Entry {\n    __typename\n    id\n    answerType\n    ...TabularQuestion\n    options: answerOptions {\n      ... on answerOptions_option_BlockType {\n        label: optionLabel\n        value: optionValue\n      }\n    }\n    id\n    questionText\n    widgetInstructions\n    questionWidgetsBlock {\n      __typename\n      ... on questionWidgetsBlock_colorFilterToolBlock_BlockType {\n        typeHandle\n        colorFilterTool {\n          ...ColorFilterToolEntry\n        }\n      }\n      ... on questionWidgetsBlock_sourceSelectorBlock_BlockType {\n        typeHandle\n        sourceSelector {\n          ...SourceSelectorEntry\n        }\n      }\n    }\n    parts: multiPartBlocks {\n      ... on multiPartBlocks_select_BlockType {\n        id\n        type: typeHandle\n        options: answerOptions {\n          ... on answerOptions_option_BlockType {\n            id\n            label: optionLabel\n            value: optionValue\n          }\n        }\n      }\n      ... on multiPartBlocks_text_BlockType {\n        id\n        type: typeHandle\n      }\n      ... on multiPartBlocks_multiselect_BlockType {\n        id\n        type: typeHandle\n        options: answerOptions {\n          ... on answerOptions_option_BlockType {\n            id\n            label: optionLabel\n            value: optionValue\n          }\n        }\n      }\n      ... on multiPartBlocks_readonlyText_BlockType {\n        id\n        type: typeHandle\n        text: questionText\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment TemplateFactory on EntryInterface {\n    __typename\n    ...PageTemplate\n  }\n"
): (typeof documents)["\n  fragment TemplateFactory on EntryInterface {\n    __typename\n    ...PageTemplate\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment ColorFilterToolQuestion on questionWidgetsBlock_colorFilterToolBlock_BlockType {\n    typeHandle\n    colorFilterTool {\n      ...ColorFilterToolEntry\n    }\n  }\n"
): (typeof documents)["\n  fragment ColorFilterToolQuestion on questionWidgetsBlock_colorFilterToolBlock_BlockType {\n    typeHandle\n    colorFilterTool {\n      ...ColorFilterToolEntry\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment LightCurveQuestion on questionWidgetsBlock_lightCurveBlock_BlockType {\n    __typename\n    typeHandle\n    lightCurveTool {\n      ... on widgets_lightCurveTool_Entry {\n        title\n        displayName\n        dataset {\n          ... on datasets_supernovaGalaxyObservations_Entry {\n            id\n            peakMjd: mjd\n            json {\n              ... on datasets_Asset {\n                url\n              }\n            }\n          }\n        }\n        yMin: yAxisMin\n        yMax: yAxisMax\n      }\n    }\n  }\n"
): (typeof documents)["\n  fragment LightCurveQuestion on questionWidgetsBlock_lightCurveBlock_BlockType {\n    __typename\n    typeHandle\n    lightCurveTool {\n      ... on widgets_lightCurveTool_Entry {\n        title\n        displayName\n        dataset {\n          ... on datasets_supernovaGalaxyObservations_Entry {\n            id\n            peakMjd: mjd\n            json {\n              ... on datasets_Asset {\n                url\n              }\n            }\n          }\n        }\n        yMin: yAxisMin\n        yMax: yAxisMax\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment SourceSelectorQuestion on questionWidgetsBlock_sourceSelectorBlock_BlockType {\n    __typename\n    typeHandle\n    sourceSelector {\n      ... on widgets_sourceSelector_Entry {\n        id\n        title\n        displayName\n        includeScatterPlot\n        yMin: yAxisMin\n        yMax: yAxisMax\n        dataset {\n          ... on datasets_supernovaGalaxyObservations_Entry {\n            id\n            peakMjd: mjd\n            sources: alertSources {\n              ... on alertSources_source_BlockType {\n                color\n                x: xCoord\n                y: yCoord\n                radius\n                type: sourceType\n                id: sourceName\n              }\n            }\n            json {\n              ... on datasets_Asset {\n                url\n              }\n            }\n            imageAlbum {\n              url {\n                directUrlOriginal\n              }\n              width\n              height\n            }\n          }\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  fragment SourceSelectorQuestion on questionWidgetsBlock_sourceSelectorBlock_BlockType {\n    __typename\n    typeHandle\n    sourceSelector {\n      ... on widgets_sourceSelector_Entry {\n        id\n        title\n        displayName\n        includeScatterPlot\n        yMin: yAxisMin\n        yMax: yAxisMax\n        dataset {\n          ... on datasets_supernovaGalaxyObservations_Entry {\n            id\n            peakMjd: mjd\n            sources: alertSources {\n              ... on alertSources_source_BlockType {\n                color\n                x: xCoord\n                y: yCoord\n                radius\n                type: sourceType\n                id: sourceName\n              }\n            }\n            json {\n              ... on datasets_Asset {\n                url\n              }\n            }\n            imageAlbum {\n              url {\n                directUrlOriginal\n              }\n              width\n              height\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment TableRows on questions_default_Entry {\n    id\n    rows: questionTable {\n      ... on questionTable_BlockType {\n        id\n        tableCell {\n          ... on tableCell_question_BlockType {\n            id\n            answerType\n          }\n          ... on tableCell_text_BlockType {\n            id\n            equation\n            text\n            header\n          }\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  fragment TableRows on questions_default_Entry {\n    id\n    rows: questionTable {\n      ... on questionTable_BlockType {\n        id\n        tableCell {\n          ... on tableCell_question_BlockType {\n            id\n            answerType\n          }\n          ... on tableCell_text_BlockType {\n            id\n            equation\n            text\n            header\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment TabularQuestion on questions_default_Entry {\n    id\n    questionText\n    ...TableRows\n  }\n"
): (typeof documents)["\n  fragment TabularQuestion on questions_default_Entry {\n    id\n    questionText\n    ...TableRows\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment HomepageTemplate on homepage_homepage_Entry {\n    __typename\n    id\n    title\n    contentBlocks: homepageContentBlocks {\n      __typename\n      ... on homepageContentBlocks_text_BlockType {\n        id\n        text\n      }\n      ... on homepageContentBlocks_image_BlockType {\n        id\n        caption\n        layout\n        image {\n          url {\n            directUrlPreview\n            directUrlOriginal\n            PNG\n            HighJPG\n            LowJPG\n            preview\n          }\n          width\n          height\n          metadata: additional {\n            AltTextEN\n            AltTextES\n            CaptionEN\n            CaptionES\n            Credit\n          }\n        }\n      }\n      ...InvestigationGridBlock\n    }\n  }\n"
): (typeof documents)["\n  fragment HomepageTemplate on homepage_homepage_Entry {\n    __typename\n    id\n    title\n    contentBlocks: homepageContentBlocks {\n      __typename\n      ... on homepageContentBlocks_text_BlockType {\n        id\n        text\n      }\n      ... on homepageContentBlocks_image_BlockType {\n        id\n        caption\n        layout\n        image {\n          url {\n            directUrlPreview\n            directUrlOriginal\n            PNG\n            HighJPG\n            LowJPG\n            preview\n          }\n          width\n          height\n          metadata: additional {\n            AltTextEN\n            AltTextES\n            CaptionEN\n            CaptionES\n            Credit\n          }\n        }\n      }\n      ...InvestigationGridBlock\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment InvestigationChildPageTemplate on investigations_default_Entry {\n    __typename\n    id\n    title\n    contentBlocks {\n      ...ContentBlockFactory\n    }\n    hasSavePoint\n    parent {\n      id\n    }\n  }\n"
): (typeof documents)["\n  fragment InvestigationChildPageTemplate on investigations_default_Entry {\n    __typename\n    id\n    title\n    contentBlocks {\n      ...ContentBlockFactory\n    }\n    hasSavePoint\n    parent {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment InvestigationLandingPageTemplate on investigations_investigationParent_Entry {\n    title\n    image {\n      url {\n        directUrlPreview\n        directUrlOriginal\n        PNG\n        HighJPG\n        LowJPG\n      }\n      width\n      height\n      metadata: additional {\n        AltTextEN\n        AltTextES\n        CaptionEN\n        CaptionES\n        Credit\n      }\n    }\n    children {\n      uri\n    }\n  }\n"
): (typeof documents)["\n  fragment InvestigationLandingPageTemplate on investigations_investigationParent_Entry {\n    title\n    image {\n      url {\n        directUrlPreview\n        directUrlOriginal\n        PNG\n        HighJPG\n        LowJPG\n      }\n      width\n      height\n      metadata: additional {\n        AltTextEN\n        AltTextES\n        CaptionEN\n        CaptionES\n        Credit\n      }\n    }\n    children {\n      uri\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment InvestigationSectionBreakTemplate on investigations_investigationSectionBreakChild_Entry {\n    __typename\n    id\n    title\n    text\n    next(section: "investigations") {\n      __typename\n      uri\n    }\n  }\n'
): (typeof documents)['\n  fragment InvestigationSectionBreakTemplate on investigations_investigationSectionBreakChild_Entry {\n    __typename\n    id\n    title\n    text\n    next(section: "investigations") {\n      __typename\n      uri\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment PageTemplate on pages_pages_Entry {\n    id\n    title\n    contentBlocks {\n      ...ContentBlockFactory\n    }\n  }\n"
): (typeof documents)["\n  fragment PageTemplate on pages_pages_Entry {\n    id\n    title\n    contentBlocks {\n      ...ContentBlockFactory\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment ReferenceContentTemplate on referenceModals_default_Entry {\n    __typename\n    title\n    id\n    contentBlocks: referenceContentBlocks {\n      __typename\n      ... on referenceContentBlocks_text_BlockType {\n        id\n        text\n      }\n      ... on referenceContentBlocks_image_BlockType {\n        id\n        caption\n        layout\n        image {\n          url {\n            directUrlPreview\n            directUrlOriginal\n            PNG\n            HighJPG\n            LowJPG\n            preview\n          }\n          width\n          height\n          metadata: additional {\n            AltTextEN\n            AltTextES\n            CaptionEN\n            CaptionES\n            Credit\n          }\n        }\n      }\n      ... on referenceContentBlocks_table_BlockType {\n        id\n        caption\n        contentHeading\n        displayTable {\n          ... on displayTable_BlockType {\n            tableRow {\n              ... on tableRow_tableCell_BlockType {\n                id\n                cellContent\n                rowHeader\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  fragment ReferenceContentTemplate on referenceModals_default_Entry {\n    __typename\n    title\n    id\n    contentBlocks: referenceContentBlocks {\n      __typename\n      ... on referenceContentBlocks_text_BlockType {\n        id\n        text\n      }\n      ... on referenceContentBlocks_image_BlockType {\n        id\n        caption\n        layout\n        image {\n          url {\n            directUrlPreview\n            directUrlOriginal\n            PNG\n            HighJPG\n            LowJPG\n            preview\n          }\n          width\n          height\n          metadata: additional {\n            AltTextEN\n            AltTextES\n            CaptionEN\n            CaptionES\n            Credit\n          }\n        }\n      }\n      ... on referenceContentBlocks_table_BlockType {\n        id\n        caption\n        contentHeading\n        displayTable {\n          ... on displayTable_BlockType {\n            tableRow {\n              ... on tableRow_tableCell_BlockType {\n                id\n                cellContent\n                rowHeader\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment AuthFragment on Auth {\n  jwt\n  jwtExpiresAt\n  refreshToken\n  refreshTokenExpiresAt\n  user {\n    ...UserFragment\n  }\n}"
): (typeof documents)["fragment AuthFragment on Auth {\n  jwt\n  jwtExpiresAt\n  refreshToken\n  refreshTokenExpiresAt\n  user {\n    ...UserFragment\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment UserFragment on UserInterface {\n  id\n  status\n}"
): (typeof documents)["fragment UserFragment on UserInterface {\n  id\n  status\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
