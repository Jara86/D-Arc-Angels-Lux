// Add mobile debugging
function addMobileDebug() {
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // Create debug console for mobile
        const debugDiv = document.createElement('div');
        debugDiv.id = 'mobile-debug';
        debugDiv.style.cssText = `
            position: fixed; bottom: 0; left: 0; right: 0; 
            background: rgba(0,0,0,0.8); color: white; 
            padding: 10px; font-size: 12px; max-height: 200px; 
            overflow-y: auto; z-index: 10000; display: none;
        `;
        document.body.appendChild(debugDiv);
        
        // Override console.log for mobile
        const originalLog = console.log;
        console.log = function(...args) {
            originalLog.apply(console, args);
            debugDiv.innerHTML += args.join(' ') + '<br>';
            debugDiv.scrollTop = debugDiv.scrollHeight;
        };
        
        // Toggle debug with triple tap
        let tapCount = 0;
        document.addEventListener('touchend', () => {
            tapCount++;
            setTimeout(() => tapCount = 0, 1000);
            if (tapCount === 3) {
                debugDiv.style.display = debugDiv.style.display === 'none' ? 'block' : 'none';
            }
        });
    }
}

// Call on page load
document.addEventListener('DOMContentLoaded', addMobileDebug);
