require 'stanford-core-nlp'

class NLPExtension
    def sentiment_analysis(text)
        pipeline = StanfordCoreNLP::Pipeline.new
        annotation = pipeline.annotate(text)
        sentiment = annotation.sentences.first.sentiment
        # Return sentiment analysis result
    end
end
