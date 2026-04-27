export default function NPCProfile({ npc }) {
  if (!npc) return null;

  const getPersonalityEmoji = (personality) => {
    const emojis = {
      patient: '🕉️',
      passionate: '🔥',
      organized: '📋',
      strict: '⚖️',
      commanding: '📢',
      aggressive: '⚔️',
      technical: '🔧',
      adventurous: '🗺️',
      mysterious: '🌙',
      menacing: '😈'
    };
    return emojis[personality] || '🎭';
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-4">
      <div className="flex items-start gap-3 mb-3">
        <span className="text-4xl">{npc.avatar}</span>
        <div className="flex-1">
          <h3 className="text-purple-400 font-bold text-lg">{npc.name}</h3>
          <p className="text-gray-400 text-sm">{npc.title}</p>
          <p className="text-gray-500 text-xs mt-1">{npc.description}</p>
        </div>
      </div>

      <div className="bg-gray-900 rounded p-3 mb-3">
        <p className="text-gray-300 text-sm italic">"{npc.greeting}"</p>
      </div>

      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span>{getPersonalityEmoji(npc.personality)}</span>
          <span className="text-gray-400 capitalize">{npc.personality}</span>
        </div>
        {npc.specialty && (
          <span className="text-emerald-400 font-bold">{npc.specialty}</span>
        )}
        {npc.isBoss && (
          <span className="bg-red-600 text-white px-2 py-1 rounded font-bold">BOSS</span>
        )}
      </div>
    </div>
  );
}
