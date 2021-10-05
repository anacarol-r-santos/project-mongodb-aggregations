db.movies.aggregate([
  {
    $unwind: "$cast",
  },
  {
    $match: {
      languages: "English",
    },
  },
  {
    $group: {
      _id: "$cast",
      numeroFilmes: { $sum: 1 },
      mediaImdb: { $avg: "$imdb.rating" },
    },
  },
  {
    $project: {
      _id: 1,
      numeroFilmes: 1,
      mediaIMDB: { $round: ["$mediaImdb", 1] },
    },
  },
  {
    $sort: {
      numeroFilmes: -1,
      _id: -1,
    },
  },
]).pretty();
