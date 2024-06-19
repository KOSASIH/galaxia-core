using MLJ

struct AdvancedAnalyticsExtension
    model::MLJ.Model
end

function predict(galaxy_data::GalaxyData, extension::AdvancedAnalyticsExtension)
    # Perform predictive modeling using MLJ
    return MLJ.predict(extension.model, galaxy_data)
end
