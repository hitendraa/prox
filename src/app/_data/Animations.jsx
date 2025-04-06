export const AnimationCategories = [
    {
        category: "Fade",
        animations: [
            { value: 'fadeIn', name: 'Fade In' },
            { value: 'fadeInUp', name: 'Fade In Up' },
            { value: 'fadeInDown', name: 'Fade In Down' },
            { value: 'fadeInScale', name: 'Fade In Scale' }
        ]
    },
    {
        category: "Slide",
        animations: [
            { value: 'slideFromLeft', name: 'Slide From Left' },
            { value: 'slideFromRight', name: 'Slide From Right' },
            { value: 'slideFromTop', name: 'Slide From Top' },
            { value: 'slideFromBottom', name: 'Slide From Bottom' }
        ]
    },
    {
        category: "Scale",
        animations: [
            { value: 'scaleUp', name: 'Scale Up' },
            { value: 'scaleDown', name: 'Scale Down' },
            { value: 'scalePop', name: 'Scale Pop' }
        ]
    },
    {
        category: "Rotate",
        animations: [
            { value: 'rotateIn', name: 'Rotate In' },
            { value: 'rotateInScale', name: 'Rotate In Scale' },
            { value: 'rotateInFade', name: 'Rotate In Fade' }
        ]
    },
    {
        category: "Special",
        animations: [
            { value: 'bounce', name: 'Bounce' },
            { value: 'elastic', name: 'Elastic' },
            { value: 'wave', name: 'Wave' },
            { value: 'glitch', name: 'Glitch' },
            { value: 'typewriter', name: 'Typewriter' }
        ]
    }
];

// Flattened list for backwards compatibility
export const AnimationList = [
    { value: 'none', name: 'No Animation' },
    ...AnimationCategories.flatMap(category => category.animations)
];

export const AnimationTimingFunctions = [
    {
        value: 'linear',
        name: 'Linear'
    },
    {
        value: 'easeInSine',
        name: 'Ease In Sine'
    },
    {
        value: 'easeOutSine',
        name: 'Ease Out Sine'
    },
    {
        value: 'easeInOutSine',
        name: 'Ease In Out Sine'
    },
    {
        value: 'easeInQuad',
        name: 'Ease In Quad'
    },
    {
        value: 'easeOutQuad',
        name: 'Ease Out Quad'
    },
    {
        value: 'easeInOutQuad',
        name: 'Ease In Out Quad'
    },
    {
        value: 'easeInCubic',
        name: 'Ease In Cubic'
    },
    {
        value: 'easeOutCubic',
        name: 'Ease Out Cubic'
    },
    {
        value: 'easeInOutCubic',
        name: 'Ease In Out Cubic'
    },
    {
        value: 'easeInElastic',
        name: 'Ease In Elastic'
    },
    {
        value: 'easeOutElastic',
        name: 'Ease Out Elastic'
    },
    {
        value: 'easeInOutElastic',
        name: 'Ease In Out Elastic'
    }
];