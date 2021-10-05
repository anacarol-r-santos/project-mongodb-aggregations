db.trips.aggregate([
  {
    $addFields: {
      duracaoMinutos: {
        $divide: [
          { $subtract: ["$stopTime", "$startTime"] },
          60000,
        ],
      },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      total: { $sum: 1 },
      duracaoMedia: {
        $avg: "$duracaoMinutos",
      },
    },
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$duracaoMedia" },
    },
  },
  {
    $sort: { duracaoMedia: -1 },
  },
  {
    $limit: 5,
  },
]).pretty();
