using System;
using System.Text.RegularExpressions;

class Program
{
    static void Main()
    {
        string input = File.ReadAllText("input.txt");
        Console.WriteLine($"Sum of enabled multiplications: {ProcessMemory(input)}");
    }

    static long ProcessMemory(string input)
    {
        // Patterns to match
        var mulRegex = new Regex(@"mul\((\d{1,3}),(\d{1,3})\)");
        var doRegex = new Regex(@"do\(\)");
        var dontRegex = new Regex(@"don't\(\)");

        // Get all matches and their positions
        var mulMatches = mulRegex.Matches(input)
            .Cast<Match>()
            .Select(m => new {
                Index = m.Index,
                X = int.Parse(m.Groups[1].Value),
                Y = int.Parse(m.Groups[2].Value)
            });

        var doMatches = doRegex.Matches(input)
            .Cast<Match>()
            .Select(m => m.Index);

        var dontMatches = dontRegex.Matches(input)
            .Cast<Match>()
            .Select(m => m.Index);

        // Combine all control points (do/don't positions) and sort them
        var controlPoints = doMatches.Select(i => new { Index = i, Enabled = true })
            .Concat(dontMatches.Select(i => new { Index = i, Enabled = false }))
            .OrderBy(cp => cp.Index)
            .ToList();

        long sum = 0;
        bool isEnabled = true; // Initially enabled

        foreach (var mul in mulMatches.OrderBy(m => m.Index))
        {
            // Update enabled state based on any control points before this multiplication
            while (controlPoints.Count > 0 && controlPoints[0].Index < mul.Index)
            {
                isEnabled = controlPoints[0].Enabled;
                controlPoints.RemoveAt(0);
            }

            if (isEnabled)
            {
                sum += mul.X * mul.Y;
            }
        }

        return sum;
    }
}