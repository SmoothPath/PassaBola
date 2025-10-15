import React, { useEffect, useState } from 'react';

const femaleTeams = [
  { id: '134825', name: 'Corinthians Feminino' },
  { id: '134827', name: 'São Paulo Feminino' },
  { id: '134829', name: 'Flamengo Feminino' },
  { id: '134832', name: 'Palmeiras Feminino' },
  { id: '134834', name: 'Internacional Feminino' },
];

const LastMatches = () => {
  const [matchesByTeam, setMatchesByTeam] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const results = {};

        // Faz a requisição para cada time (paralelo com Promise.all)
        await Promise.all(
          femaleTeams.map(async (team) => {
            const res = await fetch(`https://www.thesportsdb.com/api/v1/json/123/eventslast.php?id=${team.id}`);
            if (!res.ok) throw new Error(`Erro na API para ${team.name}`);
            const data = await res.json();
            
            // Log para verificar o que está retornando da API
            console.log(`Dados para ${team.name}:`, data);

            // Verificando se "results" está presente na resposta da API
            if (data.results) {
              const filteredResults = data.results.filter(match => 
                match.strHomeTeam && match.strAwayTeam && 
                (match.strHomeTeam.includes(team.name) || match.strAwayTeam.includes(team.name))
              );

              results[team.name] = filteredResults;
            } else {
              results[team.name] = [];
            }
          })
        );

        setMatchesByTeam(results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Carregando jogos...</p>;
  if (error) return <p className="text-center text-red-500">Erro: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-lg">
      <h2 className="text-3xl font-semibold mb-8 text-center text-indigo-600">Últimos Jogos dos Times Femininos Brasileiros</h2>

      {Object.entries(matchesByTeam).map(([teamName, matches]) => (
        <div key={teamName} className="mb-8">
          <h3 className="text-2xl font-semibold text-center mb-4 text-gray-800">{teamName}</h3>

          {matches.length === 0 ? (
            <p className="text-gray-500 text-center">Nenhum jogo encontrado para {teamName}.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {matches.map((match) => (
                <li key={match.idEvent} className="py-4">
                  <div className="flex justify-between items-center">
                    {/* Verificar se existe escudo do time mandante */}
                    <div className="flex items-center">
                      {match.strHomeTeamBadge ? (
                        <img src={match.strHomeTeamBadge} alt={match.strHomeTeam} className="w-8 h-8 mr-2" />
                      ) : (
                        <span className="text-gray-400">No Badge</span>
                      )}
                      <span className="font-semibold text-lg">{match.strHomeTeam}</span>
                    </div>

                    {/* Placar */}
                    <span className="text-xl font-bold text-gray-700">
                      {match.intHomeScore} - {match.intAwayScore}
                    </span>

                    {/* Verificar se existe escudo do time visitante */}
                    <div className="flex items-center">
                      {match.strAwayTeamBadge ? (
                        <img src={match.strAwayTeamBadge} alt={match.strAwayTeam} className="w-8 h-8 mr-2" />
                      ) : (
                        <span className="text-gray-400">No Badge</span>
                      )}
                      <span className="font-semibold text-lg">{match.strAwayTeam}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default LastMatches;
