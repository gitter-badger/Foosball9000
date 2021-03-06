﻿using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;
using Common.Logging;
using Logic;
using Models;

namespace Foosball9000Api.Controllers
{
    [EnableCors("*", "*", "*")]
    public class LeaderboardController : ApiController
    {
        private readonly ILeaderboardService _leaderboardService;
        private readonly ILogger _logger;

        public LeaderboardController(ILeaderboardService leaderboardService, ILogger logger)
        {
            _leaderboardService = leaderboardService;
            _logger = logger;
        }

        // GET: /<controller>/
        [HttpGet]
        public IEnumerable<LeaderboardViewEntry> Index()
        {
                var leaderboard = _leaderboardService.GetLatestLeaderboardView();
                return leaderboard.Entries;
        }
    }
}