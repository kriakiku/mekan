import {TranslationServiceClient} from '@google-cloud/translate';
import key from '../../key.json'

const translationClient = new TranslationServiceClient({
    projectId: key.project_id,
    credential: key
});

const projectId = 'dataset-364920';
const location = 'global';

export async function translate(
    texts: string[],
    options: {from: string, to: string}
) {

    // Construct request
    const request = {
        parent: `projects/${projectId}/locations/${location}`,
        contents: texts.map(item => item),
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
                .replace(/Одноместный/ig, 'Одиночный')
                .replace(/Одномісний/ig, 'Одиночний')
                .replace(/ENTERTAINMENTS/ig, 'Snacks')
                .replace(/НАЧАЛО И РАЗВЛЕЧЕНИЯ/ig, 'Снеки и стартеры')
                .replace(/ПОЧАТКИ ТА РОЗВАГИ/ig, 'Снеки та стартери')
                .replace(/ПЛАТЬЯ/ig, 'Буррито')
                .replace(/СУКНІ/ig, 'Бурітто')
                .replace(/ТАБАККО/ig, 'Кальян')
                .replace(/ТАБАК/ig, 'Кальян')
                .replace(/ТЮТЮН/ig, 'Кальян')
                .replace(/ВАТЕРМОН/ig, 'Арбузный')
                .replace(/КАВАН /ig, 'Кавуновий ')
                .replace(/ГАЗОВАНА ГАЗОВАНА/ig, 'Сода')
                .replace(/СОДОВАНА/ig, 'ГАЗОВАНА')
                .replace(/СТЕКЛЯННАЯ/ig, 'Стакан')
                .replace(/ЧАЙ со льдом/ig, 'Холодный чай')
                .replace(/ЛЕДЯНОЙ ЧАЙ/ig, 'Холодный чай')
                .replace(/З ХОЛОДНИМ ЧАЄМ/ig, 'ХОЛОДНИЙ ЧАЙ')
                .replace(/Холодный чай ЗАВТРАК/ig, 'Холодный чай Лимоном')
                .replace(/СНІДАНОК ХОЛОДНИЙ ЧАЙ/ig, 'Холодний чай з лимоном')
                .replace(/ЗАРЯДНОЕ УСТРОЙСТВО/ig, 'Энергетик "CHARGER"')
                .replace(/ЗАРЯДНИЙ ПРИСТРІЙ/ig, 'Енергетик "CHARGER"')
                .replace(/СЕМЬ ВВЕРХ/ig, 'SEVEN UP')
                .replace(/СІМ ВГОРУ/ig, 'SEVEN UP')
                .replace(/КОКА-КОЛА НОЛЬ/ig, 'COCA COLA ZERO')
        )
}