import Map "mo:core/Map";
import Array "mo:core/Array";
import List "mo:core/List";
import Int "mo:core/Int";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

actor {
  type VocabularyWord = {
    word : Text;
    definition : Text;
    partOfSpeech : Text;
    exampleSentence : Text;
    difficultyLevel : Nat;
    category : Text;
  };

  type Question = {
    questionWord : Text;
    options : [Text];
    correctAnswerIndex : Nat;
  };

  type UserStats = {
    wordsLearned : Nat;
    totalAttempts : Nat;
    correctAnswers : Nat;
  };

  let vocabulary = List.fromArray<VocabularyWord>(
    [
      {
        word = "Aberration";
        definition = "a departure from what is normal or expected";
        partOfSpeech = "Noun";
        exampleSentence = "The sudden drop in temperature was an aberration.";
        difficultyLevel = 3;
        category = "General";
      },
      {
        word = "Belligerent";
        definition = "hostile and aggressive";
        partOfSpeech = "Adjective";
        exampleSentence = "His belligerent attitude caused many conflicts.";
        difficultyLevel = 2;
        category = "Personality";
      },
      {
        word = "Cacophony";
        definition = "a harsh, discordant mixture of sounds";
        partOfSpeech = "Noun";
        exampleSentence = "The cacophony in the city made it hard to concentrate.";
        difficultyLevel = 4;
        category = "Sound";
      },
      { word = "Deleterious"; definition = "causing harm or damage"; partOfSpeech = "Adjective"; exampleSentence = "Smoking has deleterious effects on health."; difficultyLevel = 4; category = "Health" },
      { word = "Enervate"; definition = "to weaken or drain of energy"; partOfSpeech = "Verb"; exampleSentence = "The scorching sun enervated the hikers."; difficultyLevel = 5; category = "Energy" },
      { word = "Fortitude"; definition = "courage in facing difficulties"; partOfSpeech = "Noun"; exampleSentence = "She showed great fortitude in the face of adversity."; difficultyLevel = 3; category = "Character" },
      { word = "Garrulous"; definition = "excessively talkative"; partOfSpeech = "Adjective"; exampleSentence = "The garrulous host kept the conversation lively."; difficultyLevel = 4; category = "Personality" },
      { word = "Harangue"; definition = "a long, passionate, and intense speech"; partOfSpeech = "Noun"; exampleSentence = "The politician's harangue lasted over an hour."; difficultyLevel = 5; category = "Speech" },
      { word = "Idiosyncrasy"; definition = "an individual’s peculiar characteristic"; partOfSpeech = "Noun"; exampleSentence = "His idiosyncrasy was always humming while working."; difficultyLevel = 4; category = "Personality" },
      { word = "Juxtapose"; definition = "to place side by side for contrast"; partOfSpeech = "Verb"; exampleSentence = "The artist juxtaposed vibrant colors in her painting."; difficultyLevel = 3; category = "Art" },
      { word = "Keen"; definition = "having a sharp edge or intellect"; partOfSpeech = "Adjective"; exampleSentence = "She had a keen sense of humor."; difficultyLevel = 2; category = "Personality" },
      { word = "Lethargic"; definition = "sluggish and lacking energy"; partOfSpeech = "Adjective"; exampleSentence = "After the meal, everyone felt lethargic."; difficultyLevel = 2; category = "Energy" },
      { word = "Mollify"; definition = "to soften or calm";
        partOfSpeech = "Verb"; exampleSentence = "Her words mollified the angry crowd."; difficultyLevel = 4; category = "Emotion" },
      { word = "Nadir"; definition = "the lowest point of something"; partOfSpeech = "Noun"; exampleSentence = "The company hit its nadir during the recession."; difficultyLevel = 3; category = "Business" },
      { word = "Obfuscate"; definition = "to confuse or make unclear"; partOfSpeech = "Verb"; exampleSentence = "The technical jargon obfuscated the meaning for many."; difficultyLevel = 5; category = "Communication" },
      { word = "Palpable"; definition = "so intense as to seem touchable"; partOfSpeech = "Adjective"; exampleSentence = "The tension in the room was palpable."; difficultyLevel = 3; category = "Emotion" },
      { word = "Quixotic"; definition = "exceedingly idealistic or unrealistic"; partOfSpeech = "Adjective"; exampleSentence = "His quixotic plans often failed."; difficultyLevel = 4; category = "Personality" },
      { word = "Recalcitrant"; definition = "stubbornly uncooperative"; partOfSpeech = "Adjective"; exampleSentence = "The recalcitrant employee refused to follow orders."; difficultyLevel = 5; category = "Personality" },
      { word = "Sagacious"; definition = "having good judgment; wise"; partOfSpeech = "Adjective"; exampleSentence = "Her sagacious decisions led the team to success."; difficultyLevel = 4; category = "Personality" },
      { word = "Taciturn"; definition = "reserved or uncommunicative"; partOfSpeech = "Adjective"; exampleSentence = "The taciturn man rarely spoke in meetings."; difficultyLevel = 4; category = "Personality" },
      {
        word = "Ubiquitous";
        definition = "present everywhere";
        partOfSpeech = "Adjective";
        exampleSentence = "Smartphones are now ubiquitous.";
        difficultyLevel = 2;
        category = "Technology";
      },
    ]
  );

  let userStats = Map.empty<Principal, UserStats>();

  public shared ({ caller }) func addWord(word : Text, definition : Text, partOfSpeech : Text, exampleSentence : Text, difficultyLevel : Nat, category : Text) : async () {
    let newWord : VocabularyWord = {
      word;
      definition;
      partOfSpeech;
      exampleSentence;
      difficultyLevel;
      category;
    };
    vocabulary.add(newWord);
  };

  func getRandomIndex(arraySize : Nat) : Nat {
    if (arraySize == 0) { Runtime.trap("Array cannot be empty!") };
    arraySize - 1;
  };

  func generateAlternativeOptions(correctDefinition : Text) : [Text] {
    let vocabularyArray = vocabulary.toArray();
    let arraySize = vocabularyArray.size();

    if (arraySize <= 4) {
      // Less than 4 items, return all definitions plus correct one
      return vocabularyArray.map(func(word) { word.definition }).concat([correctDefinition]);
    };

    // Get first 4 items
    let alternatives = vocabularyArray.sliceToArray(0, 4).map(func(word) { word.definition });
    alternatives.concat([correctDefinition]);
  };

  public shared ({ caller }) func getPracticeQuestion() : async Question {
    let vocabularyArray = vocabulary.toArray();
    if (vocabularyArray.isEmpty()) { Runtime.trap("No vocabulary available") };

    let randomIndex = getRandomIndex(vocabularyArray.size());
    let chosenWord = vocabularyArray[randomIndex];

    let options = generateAlternativeOptions(chosenWord.definition);
    let correctIndex = options.findIndex(func(option) { option == chosenWord.definition });

    {
      questionWord = chosenWord.word;
      options;
      correctAnswerIndex = switch (correctIndex) {
        case (null) { 0 };
        case (?index) { index };
      };
    };
  };

  public shared ({ caller }) func submitAnswer(isCorrect : Bool) : async Bool {
    if (userStats.containsKey(caller)) {
      switch (userStats.get(caller)) {
        case (?stats) {
          let updatedStats : UserStats = {
            wordsLearned = stats.wordsLearned + (if (isCorrect) { 1 } else { 0 });
            totalAttempts = stats.totalAttempts + 1;
            correctAnswers = stats.correctAnswers + (if (isCorrect) { 1 } else { 0 });
          };
          userStats.add(caller, updatedStats);
        };
        case (null) {
          let newStats : UserStats = {
            wordsLearned = (if (isCorrect) { 1 } else { 0 });
            totalAttempts = 1;
            correctAnswers = (if (isCorrect) { 1 } else { 0 });
          };
          userStats.add(caller, newStats);
        };
      };
    } else {
      let newStats : UserStats = {
        wordsLearned = (if (isCorrect) { 1 } else { 0 });
        totalAttempts = 1;
        correctAnswers = (if (isCorrect) { 1 } else { 0 });
      };
      userStats.add(caller, newStats);
    };
    isCorrect;
  };

  public query ({ caller }) func getUserStats(user : Principal) : async UserStats {
    switch (userStats.get(user)) {
      case (?stats) { stats };
      case (null) {
        {
          wordsLearned = 0;
          totalAttempts = 0;
          correctAnswers = 0;
        };
      };
    };
  };
};
