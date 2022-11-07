import {TranslationServiceClient} from '@google-cloud/translate';

const translationClient = new TranslationServiceClient();

const projectId = 'dataset-364920';
const location = 'global';

export async function translate(
    texts: string[],
    options: {from: string, to: string}
) {

    // Construct request
    const request = {
        parent: `projects/${projectId}/locations/${location}`,
        contents: texts,
        mimeType: 'text/plain',
        sourceLanguageCode: options.from,
        targetLanguageCode: options.to,
    };

    // Run request
    const [response] = await translationClient.translateText(request);

    return response
        .translations
        .map(
            item => item.translatedText
                .replaceAll('Одноместный', 'Одиночный')
                .replaceAll('Одномісний', 'Одиночний')
        )
}