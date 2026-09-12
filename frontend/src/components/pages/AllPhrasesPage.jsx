const AllPhrasesPage = ({ allPhrases}) => {
    const renderAllPhrases = allPhrases.map((phrase, idx) => {
        return (
            <div key={phrase.idx} className="phrase">
                <h3>{phrase.phrase}</h3>
                <h4>{phrase.translation}</h4>
                <h4>{phrase.pronunciation}</h4>
            </div>
        );
    });

    return (
        <div className="all-phrases-page">
            <h2>All Phrases</h2>
            <table>
                <thead>
                    <tr>
                        <th>Phrase</th>
                        <th>Translation</th>
                        <th>Pronunciation</th>
                    </tr>
                </thead>
                <tbody>
                    {allPhrases.map((phrase) => (
                        <tr key={phrase.id}>
                            <td className="phrase-cell">{phrase.phrase}</td>
                            <td className="translation-cell">{phrase.translation}</td>
                            <td className="pronunciation-cell">{phrase.pronunciation}</td>
                        </tr>
                    ))}
                </tbody>
            </table>       
        </div>
    );
};

export default AllPhrasesPage;