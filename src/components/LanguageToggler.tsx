
const LanguageToggler = (props: any) => {
    const { locale, languageToggler } = props;
    return (
       <button onClick={languageToggler}>Switch language 🇬🇧 🇰🇪 ({locale})</button>
    );
 };
 
 export default LanguageToggler;