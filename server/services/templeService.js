// In a real Spring Boot-like architecture, this might call a repository.
exports.getTempleDetails = async () => {
  return {
    name: 'Jagannatha Temple',
    location: 'Puri, Odisha',
    deities: ['Lord Jagannath', 'Lord Balabhadra', 'Goddess Subhadra'],
    description: 'A famous, sacred Hindu temple dedicated to Jagannath and located on the eastern coast of India.'
  };
};
